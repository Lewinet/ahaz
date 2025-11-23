'use client'

import { useEffect, useState, useRef } from 'react'
import { useSupabase } from '@/components/providers/supabase-provider'
import { RealtimeChannel } from '@supabase/supabase-js'

type DriverLocation = {
    user_id: string
    lat: number
    lng: number
    bearing: number
    vehicle_type: string
}

export function useDriverLocation(isDriver: boolean, isOnline: boolean) {
    const { supabase } = useSupabase()
    const [drivers, setDrivers] = useState<Record<string, DriverLocation>>({})
    const channelRef = useRef<RealtimeChannel | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Initialize channel
        const channel = supabase.channel('drivers')
            .on('broadcast', { event: 'location' }, ({ payload }) => {
                setDrivers((prev) => ({
                    ...prev,
                    [payload.user_id]: payload,
                }))
            })
            .subscribe()

        channelRef.current = channel

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    useEffect(() => {
        if (isDriver && isOnline) {
            // Start broadcasting location
            intervalRef.current = setInterval(() => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const payload: DriverLocation = {
                            user_id: 'me', // In real app, use auth.user.id
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            bearing: position.coords.heading || 0,
                            vehicle_type: 'sedan', // Default
                        }

                        // We don't need to see ourselves in the drivers list usually, but for debug we might.
                        // But here we broadcast.
                        channelRef.current?.send({
                            type: 'broadcast',
                            event: 'location',
                            payload: payload,
                        })
                    })
                }
            }, 2000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isDriver, isOnline])

    return drivers
}

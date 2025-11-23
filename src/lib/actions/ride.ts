'use server'

import { createClient } from '@/lib/supabase/server'
export async function requestRide(origin: { lat: number, lng: number }, destination: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    // 1. Geocode destination (Mock for now, or use client coords if passed)
    // For MVP, let's assume destination is just a string and we mock coords slightly offset from origin
    // In real app, we'd use a geocoding API.

    const destLat = origin.lat + 0.01
    const destLng = origin.lng + 0.01

    // 2. Calculate Fare (Mock)
    const fare = 15.00

    // 3. Create Ride
    const { data, error } = await supabase
        .from('rides')
        .insert({
            passenger_id: user.id,
            origin_lat: origin.lat,
            origin_lng: origin.lng,
            dest_lat: destLat,
            dest_lng: destLng,
            fare_total: fare,
            status: 'requested'
        })
        .select()
        .single()

    if (error) {
        console.error('Error requesting ride:', error)
        return { success: false, error: error.message }
    }

    return { success: true, ride: data }
}



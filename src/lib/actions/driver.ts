'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function createClient() {
    const cookieStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.delete({ name, ...options })
                },
            },
        }
    )
}

export async function goOnline(isOnline: boolean) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    // Upsert driver profile
    const { error } = await supabase
        .from('driver_profiles')
        .upsert({
            user_id: user.id,
            is_online: isOnline,
            updated_at: new Date().toISOString()
        })

    if (error) {
        console.error('Error toggling online status:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function getPendingRides() {
    const supabase = await createClient()

    // In real app, filter by location radius
    const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('status', 'requested')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching pending rides:', error)
        return []
    }

    return data
}

export async function acceptRide(rideId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    const { error } = await supabase
        .from('rides')
        .update({
            status: 'accepted',
            driver_id: user.id
        })
        .eq('id', rideId)
        .eq('status', 'requested') // Ensure it's still available

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

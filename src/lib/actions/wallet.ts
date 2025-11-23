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

export async function getWalletBalance() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
        .from('wallets')
        .select('balance, currency')
        .eq('user_id', user.id)
        .single()

    if (error) {
        console.error('Error fetching wallet:', error)
        return null
    }

    return data
}

export async function transferFunds(recipientEmail: string, amount: number) {
    const supabase = await createClient()

    // 1. Resolve recipient ID from email (In a real app, maybe use a username or phone)
    // For this MVP, we'll query profiles by email if we stored it, but profiles doesn't have email.
    // We can't query auth.users directly from client/server action easily without admin key.
    // So we might need to rely on a public profile search or just use ID for now.
    // OR, we can assume the user inputs a UUID.
    // Let's try to find a profile by full_name for now as a proxy, or just ask for UUID.
    // The PRD says "P2P sending".
    // Let's assume we pass the UUID for now to keep it simple, or add email to profiles?
    // Adding email to profiles is a privacy risk if public.
    // Let's stick to UUID or maybe a "username" if we had one.
    // I'll implement it to take a UUID for now.

    const recipientId = recipientEmail // For now, assume input is ID.

    const { error } = await supabase.rpc('transfer_funds', {
        recipient_id: recipientId,
        amount: amount
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

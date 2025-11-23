'use server'

import { createClient } from '@/lib/supabase/server'
export async function getAdminStats() {
    const supabase = await createClient()

    // Check if admin (simplified check)
    // In real app, check profile role

    // 1. Total Float (Sum of all wallets)
    const { data: wallets } = await supabase
        .from('wallets')
        .select('balance')

    const totalFloat = wallets?.reduce((sum, w) => sum + (w.balance || 0), 0) || 0

    // 2. Total Users
    const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    // 3. Total Transactions
    const { count: txCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })

    // 4. Total Orders
    const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

    // 5. Total Rides
    const { count: rideCount } = await supabase
        .from('rides')
        .select('*', { count: 'exact', head: true })

    return {
        totalFloat,
        userCount: userCount || 0,
        txCount: txCount || 0,
        orderCount: orderCount || 0,
        rideCount: rideCount || 0
    }
}

export async function getAllOrders() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            product:products(title, price),
            buyer:profiles!orders_buyer_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        console.error('Error fetching orders:', error)
        return []
    }

    return data
}

export async function getAllRides() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('rides')
        .select(`
            *,
            passenger:profiles!rides_passenger_id_fkey(full_name),
            driver:profiles!rides_driver_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        console.error('Error fetching rides:', error)
        return []
    }

    return data
}

export async function getAllProducts() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            seller:profiles!products_seller_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        console.error('Error fetching products:', error)
        return []
    }

    return data
}

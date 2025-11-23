'use server'

import { createClient } from '@/lib/supabase/server'
export async function getProducts() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('stock', 0)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return []
    }

    return data
}

export async function createOrder(productId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    // 1. Get Product to check stock and price
    const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (productError || !product) {
        return { success: false, error: 'Product not found' }
    }

    if (product.stock <= 0) {
        return { success: false, error: 'Out of stock' }
    }

    // 2. Check Wallet Balance
    const { data: wallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single()

    if (!wallet || wallet.balance < product.price) {
        return { success: false, error: 'Insufficient funds' }
    }

    // 3. Create Order (Transaction should be atomic in real app, here we do optimistic)
    // Generate simple 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString()

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            buyer_id: user.id,
            product_id: productId,
            status: 'pending',
            pickup_pin: pin
        })
        .select()
        .single()

    if (orderError) {
        return { success: false, error: orderError.message }
    }

    // 4. Decrement Stock
    await supabase
        .from('products')
        .update({ stock: product.stock - 1 })
        .eq('id', productId)

    // 5. Deduct Funds (Move to Escrow/Hold - simplified here as direct deduction)
    // In a real app, we'd move to a system wallet. Here we just deduct.
    await supabase
        .from('wallets')
        .update({ balance: wallet.balance - product.price })
        .eq('user_id', user.id)

    return { success: true, order, pin }
}

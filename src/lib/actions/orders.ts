'use server'

import { createClient } from '@/lib/supabase/server'
export async function getOrders(role: 'buyer' | 'seller') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    let query = supabase
        .from('orders')
        .select(`
      *,
      product:products(title, price, seller_id)
    `)
        .order('created_at', { ascending: false })

    if (role === 'buyer') {
        query = query.eq('buyer_id', user.id)
    } else {
        // For seller, we need to join products to filter by seller_id
        // But Supabase simple filtering on joined tables is tricky with just .eq
        // We might need to filter in application or use a better query.
        // Let's rely on RLS policies which restrict view!
        // If RLS is set correctly:
        // "Sellers view orders for their products" -> product_id in (select id from products where seller_id = auth.uid())
        // So we can just select * and RLS will filter?
        // Let's try.
        // Actually, for a specific "My Sales" view, we want to be explicit.
        // But since we don't have a direct seller_id on orders, we rely on the join or RLS.
        // Let's assume RLS handles visibility.
        // However, a buyer might also be a seller.
        // So we need to distinguish "Orders I bought" vs "Orders I sold".

        // Orders I sold:
        // We need to find orders where product.seller_id = me.
        // Supabase JS client supports filtering on foreign tables?
        // .eq('product.seller_id', user.id) -> This usually requires !inner join.

        const { data: products } = await supabase.from('products').select('id').eq('seller_id', user.id)
        const productIds = products?.map(p => p.id) || []

        if (productIds.length > 0) {
            query = query.in('product_id', productIds)
        } else {
            return []
        }
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching orders:', error)
        return []
    }

    return data
}

export async function verifyPin(orderId: string, pin: string) {
    const supabase = await createClient()

    // 1. Verify PIN
    const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('pickup_pin', pin)
        .single()

    if (error || !order) {
        return { success: false, error: 'Invalid PIN' }
    }

    if (order.status === 'completed') {
        return { success: false, error: 'Order already completed' }
    }

    // 2. Mark Completed
    const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId)

    if (updateError) {
        return { success: false, error: updateError.message }
    }

    // 3. Release Funds (Simulated)
    // In real app, we'd trigger a transfer from Escrow to Seller.
    // Here, we already deducted from Buyer. We just need to Add to Seller.
    // We need to get the product price and seller ID.

    const { data: product } = await supabase
        .from('products')
        .select('price, seller_id')
        .eq('id', order.product_id)
        .single()

    if (product) {
        // Get Seller Wallet
        const { data: sellerWallet } = await supabase
            .from('wallets')
            .select('id, balance')
            .eq('user_id', product.seller_id)
            .single()

        if (sellerWallet) {
            await supabase
                .from('wallets')
                .update({ balance: sellerWallet.balance + product.price })
                .eq('id', sellerWallet.id)

            // Record Transaction
            await supabase
                .from('transactions')
                .insert({
                    receiver_wallet_id: sellerWallet.id,
                    amount: product.price,
                    type: 'release',
                    reference_id: order.id
                })
        }
    }

    return { success: true }
}

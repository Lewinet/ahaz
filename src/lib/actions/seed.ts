'use server'

import { createClient } from '@/lib/supabase/server'
export async function seedProducts() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    const products = [
        {
            seller_id: user.id,
            title: 'Vintage Camera',
            description: 'A classic film camera in working condition.',
            price: 120.00,
            stock: 1,
            image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
        },
        {
            seller_id: user.id,
            title: 'Leather Backpack',
            description: 'Handmade leather backpack, perfect for travel.',
            price: 85.50,
            stock: 5,
            image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
        },
        {
            seller_id: user.id,
            title: 'Wireless Headphones',
            description: 'Noise cancelling headphones with long battery life.',
            price: 199.99,
            stock: 10,
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        },
        {
            seller_id: user.id,
            title: 'Espresso Machine',
            description: 'Professional grade espresso machine for home use.',
            price: 450.00,
            stock: 2,
            image_url: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=800&q=80'
        }
    ]

    const { error } = await supabase
        .from('products')
        .insert(products)

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

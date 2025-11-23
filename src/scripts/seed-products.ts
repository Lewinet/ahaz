
import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'

// Load env vars
// dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
    {
        title: 'Premium Headphones',
        description: 'High-quality noise cancelling headphones.',
        price: 299.99,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        stock: 50
    },
    {
        title: 'Ergonomic Chair',
        description: 'Comfortable office chair for long work hours.',
        price: 199.50,
        image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
        stock: 20
    },
    {
        title: 'Mechanical Keyboard',
        description: 'Tactile mechanical keyboard with RGB lighting.',
        price: 129.00,
        image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=800&q=80',
        stock: 35
    },
    {
        title: 'Smart Watch',
        description: 'Track your fitness and notifications.',
        price: 249.99,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        stock: 100
    },
    {
        title: 'Coffee Maker',
        description: 'Brew the perfect cup of coffee every morning.',
        price: 89.95,
        image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        stock: 15
    }
]

async function seedProducts() {
    console.log('Seeding products...')

    // Get the first user as seller (or you could create a dedicated seller account)
    const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .single()

    if (profileError || !profiles) {
        console.error('No profiles found. Please create a user account first.')
        console.error('You can sign up at: http://localhost:3000/login')
        return
    }

    const sellerId = profiles.id
    console.log(`Using seller ID: ${sellerId}`)

    // Add seller_id to each product
    const productsWithSeller = products.map(p => ({ ...p, seller_id: sellerId }))

    const { data, error } = await supabase
        .from('products')
        .insert(productsWithSeller)
        .select()

    if (error) {
        console.error('Error seeding products:', error)
    } else {
        console.log(`✅ Successfully seeded ${data.length} products!`)
    }
}

seedProducts()

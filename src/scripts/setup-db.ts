import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
    console.log('Setting up database tables...')
    console.log('')
    console.log('⚠️  IMPORTANT: This script cannot create tables directly.')
    console.log('Please run the SQL in supabase/migrations/001_add_products_table.sql')
    console.log('in your Supabase SQL Editor at: https://supabase.com/dashboard/project/_/sql')
    console.log('')
    console.log('After running the migration, run this script again to seed data.')
    console.log('')

    // Check if products table exists
    const { data, error } = await supabase
        .from('products')
        .select('count', { count: 'exact', head: true })

    if (error) {
        console.error('❌ Products table not found. Please run the migration SQL first.')
        console.error('Error:', error.message)
        process.exit(1)
    }

    console.log('✅ Products table exists!')
    console.log('Ready to seed data.')
}

setupDatabase()


import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv'
// dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase.from('orders').select('count', { count: 'exact', head: true })

    if (error) {
        console.error('Connection failed or profiles table missing:', error.message)
        // Try a public table or just auth check if users table is protected/doesn't exist
        const { data: authData, error: authError } = await supabase.auth.getSession()
        if (authError) {
            console.error('Auth check also failed:', authError.message)
        } else {
            console.log('Auth connection successful.')
        }
    } else {
        console.log('Connection successful!')
    }
}

testConnection()

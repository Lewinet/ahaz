import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function applyMigration() {
    console.log('Applying migration: 001_add_products_table.sql')

    const migrationPath = join(process.cwd(), 'supabase/migrations/001_add_products_table.sql')
    const sql = readFileSync(migrationPath, 'utf-8')

    // Split by semicolons and execute each statement
    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
        try {
            const { error } = await supabase.rpc('exec_sql', { sql_query: statement })
            if (error) {
                console.error('Error executing statement:', error)
                console.log('Statement:', statement.substring(0, 100) + '...')
            }
        } catch (err) {
            console.error('Failed to execute:', err)
        }
    }

    console.log('Migration completed!')
}

applyMigration()

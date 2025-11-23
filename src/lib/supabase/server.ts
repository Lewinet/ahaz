import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // During build time without env vars, return a minimal mock
    if (!supabaseUrl || !supabaseKey) {
        // Use valid URL format to pass Supabase validation
        const mockUrl = 'https://mock.supabase.co'
        const mockKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY2siLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjU0MjQwMCwiZXhwIjoxOTU4MTE4NDAwfQ.mock'

        return createServerClient(mockUrl, mockKey, {
            cookies: {
                get() { return undefined },
                set() { },
                remove() { },
            },
        })
    }

    const cookieStore = await cookies()
    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // Handle build-time cookie errors
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.delete({ name, ...options })
                    } catch (error) {
                        // Handle build-time cookie errors
                    }
                },
            },
        }
    )
}

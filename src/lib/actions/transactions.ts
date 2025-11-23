'use server'

import { createClient } from '@/lib/supabase/server'
export async function getTransactions() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    // Get user's wallet first
    const { data: wallet } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!wallet) return []

    // Fetch transactions where user is sender OR receiver
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .or(`sender_wallet_id.eq.${wallet.id},receiver_wallet_id.eq.${wallet.id}`)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching transactions:', error)
        return []
    }

    // Enrich data to know if it was credit or debit
    return data.map(tx => ({
        ...tx,
        is_debit: tx.sender_wallet_id === wallet.id
    }))
}

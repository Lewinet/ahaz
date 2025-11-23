'use client'

import { useState, useEffect } from 'react'
import { getTransactions } from '@/lib/actions/transactions'
import { ArrowUpRight, ArrowDownLeft, Clock, Search } from 'lucide-react'

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            setLoading(true)
            const data = await getTransactions()
            setTransactions(data || [])
            setLoading(false)
        }
        load()
    }, [])

    return (
        <div className="max-w-2xl mx-auto p-4 pb-24 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
                <p className="text-gray-500 dark:text-gray-400">View your recent activity</p>
            </header>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No transactions yet</h3>
                    <p className="text-gray-500">Your activity will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.is_debit
                                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                        : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                    }`}>
                                    {tx.is_debit ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                                        {tx.type}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(tx.created_at).toLocaleDateString()} • {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className={`text-right font-semibold ${tx.is_debit ? 'text-gray-900 dark:text-white' : 'text-green-600 dark:text-green-400'
                                }`}>
                                {tx.is_debit ? '-' : '+'}${Number(tx.amount).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

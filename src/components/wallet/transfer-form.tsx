'use client'

import { useState } from 'react'
import { transferFunds } from '@/lib/actions/wallet'
import { Send } from 'lucide-react'

export function TransferForm() {
    const [recipientId, setRecipientId] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const result = await transferFunds(recipientId, Number(amount))

        if (result.success) {
            setMessage({ type: 'success', text: 'Transfer successful!' })
            setRecipientId('')
            setAmount('')
        } else {
            setMessage({ type: 'error', text: result.error || 'Transfer failed' })
        }
        setLoading(false)
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Send className="h-5 w-5 text-indigo-600" />
                Send Money
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                        Recipient ID (UUID)
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="e.g. 123e4567-e89b-..."
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            required
                            min="0.01"
                            step="0.01"
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                {message && (
                    <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Funds'}
                </button>
            </form>
        </div>
    )
}

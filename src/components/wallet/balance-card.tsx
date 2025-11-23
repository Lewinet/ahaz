import { Wallet } from 'lucide-react'

export function BalanceCard({ balance, currency }: { balance: number; currency: string }) {
    return (
        <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-indigo-200">Total Balance</p>
                    <h2 className="mt-1 text-3xl font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(balance)}
                    </h2>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                    <Wallet className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}

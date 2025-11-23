import { getWalletBalance } from '@/lib/actions/wallet'
import { getTransactions } from '@/lib/actions/transactions'
import { BalanceCard } from '@/components/wallet/balance-card'
import { PublicLanding } from '@/components/landing/public-landing'
import Link from 'next/link'
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, ShoppingBag, Car, Package, Settings, TrendingUp, Clock } from 'lucide-react'

// Force dynamic rendering to prevent build-time Supabase calls
export const dynamic = 'force-dynamic'

export default async function Home() {
  const wallet = await getWalletBalance()

  // If not authenticated, show public landing page
  if (!wallet) {
    return <PublicLanding />
  }

  // Get recent transactions for authenticated users
  const transactions = await getTransactions()
  const recentTransactions = transactions.slice(0, 5)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 px-4 pt-6 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-indigo-100 text-sm">Welcome back</p>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            </div>
            <Link href="/settings" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Settings className="text-white" size={20} />
            </Link>
          </div>

          {/* Balance Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-indigo-100 text-sm mb-2">Total Balance</p>
            <p className="text-4xl font-bold text-white mb-4">
              ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="flex gap-3">
              <Link
                href="/transactions"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
              >
                <Send size={18} />
                Send
              </Link>
              <Link
                href="/transactions"
                className="flex-1 flex items-center justify-center gap-2 bg-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30"
              >
                <ArrowDownLeft size={18} />
                Receive
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-4">
        {/* Quick Actions */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/map"
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Car className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Request Ride</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Get a ride now</p>
            </Link>

            <Link
              href="/market"
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Shop Now</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Browse products</p>
            </Link>

            <Link
              href="/orders"
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Package className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">My Orders</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Track packages</p>
            </Link>

            <Link
              href="/driver/rides"
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Drive & Earn</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Become a driver</p>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Link href="/transactions" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              View All
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your transactions will appear here</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              {recentTransactions.map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.is_debit
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                      {tx.is_debit ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{tx.type}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.is_debit ? 'text-gray-900 dark:text-white' : 'text-green-600 dark:text-green-400'
                    }`}>
                    {tx.is_debit ? '-' : '+'}${Number(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

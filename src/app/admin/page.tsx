import { getAdminStats, getAllOrders, getAllRides, getAllProducts } from '@/lib/actions/admin'
// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { seedProducts } from '@/lib/actions/seed'
import { Users, DollarSign, Activity, Database, ShoppingBag, Car } from 'lucide-react'

export default async function AdminPage() {
    const stats = await getAdminStats()
    const orders = await getAllOrders()
    const rides = await getAllRides()
    const products = await getAllProducts()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pb-24">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Float</p>
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                ${stats.totalFloat.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.userCount}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.txCount}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                            <Activity size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.orderCount}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rides</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.rideCount}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                            <Car size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h2>
                <form action={async () => {
                    'use server'
                    await seedProducts()
                }}>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:opacity-90"
                    >
                        <Database size={16} />
                        Seed Demo Products
                    </button>
                </form>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                <th className="pb-3">Product</th>
                                <th className="pb-3">Buyer</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Price</th>
                                <th className="pb-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {orders.map((order: any) => (
                                <tr key={order.id} className="text-gray-900 dark:text-white">
                                    <td className="py-3">{order.product?.title || 'N/A'}</td>
                                    <td className="py-3">{order.buyer?.full_name || 'Unknown'}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3">${order.product?.price || 0}</td>
                                    <td className="py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No orders yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Rides</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                <th className="pb-3">Passenger</th>
                                <th className="pb-3">Driver</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Fare</th>
                                <th className="pb-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {rides.map((ride: any) => (
                                <tr key={ride.id} className="text-gray-900 dark:text-white">
                                    <td className="py-3">{ride.passenger?.full_name || 'Unknown'}</td>
                                    <td className="py-3">{ride.driver?.full_name || 'Unassigned'}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${ride.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                ride.status === 'accepted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    ride.status === 'requested' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {ride.status}
                                        </span>
                                    </td>
                                    <td className="py-3">${ride.fare_total?.toFixed(2) || '0.00'}</td>
                                    <td className="py-3">{new Date(ride.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {rides.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No rides yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Products */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Products</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                <th className="pb-3">Title</th>
                                <th className="pb-3">Seller</th>
                                <th className="pb-3">Price</th>
                                <th className="pb-3">Stock</th>
                                <th className="pb-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {products.map((product: any) => (
                                <tr key={product.id} className="text-gray-900 dark:text-white">
                                    <td className="py-3">{product.title}</td>
                                    <td className="py-3">{product.seller?.full_name || 'Unknown'}</td>
                                    <td className="py-3">${product.price}</td>
                                    <td className="py-3">
                                        <span className={`${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="py-3">{new Date(product.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No products yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useEffect, useState } from 'react'
import { getOrders, verifyPin } from '@/lib/actions/orders'
import { ModeSwitcher } from '@/components/ui/mode-switcher'
import { clsx } from 'clsx'

type Order = {
    id: string
    status: string
    pickup_pin: string
    created_at: string
    product: {
        title: string
        price: number
    }
}

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<'buying' | 'selling'>('buying')
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadOrders()
    }, [activeTab])

    const loadOrders = async () => {
        setLoading(true)
        const data = await getOrders(activeTab === 'buying' ? 'buyer' : 'seller')
        setOrders(data as any) // Type assertion for simplicity
        setLoading(false)
    }

    const handleVerify = async (orderId: string) => {
        const pin = prompt('Enter Customer PIN:')
        if (!pin) return

        const result = await verifyPin(orderId, pin)
        if (result.success) {
            alert('Order Verified! Funds released.')
            loadOrders()
        } else {
            alert('Error: ' + result.error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
                <h1 className="text-xl font-bold text-indigo-900">Orders</h1>
                <ModeSwitcher />
            </header>

            <main className="p-4 max-w-2xl mx-auto">
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('buying')}
                        className={clsx(
                            'flex-1 py-2 text-center font-medium text-sm',
                            activeTab === 'buying' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
                        )}
                    >
                        Buying
                    </button>
                    <button
                        onClick={() => setActiveTab('selling')}
                        className={clsx(
                            'flex-1 py-2 text-center font-medium text-sm',
                            activeTab === 'selling' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'
                        )}
                    >
                        Selling
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{order.product?.title || 'Unknown Product'}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                        <span className={clsx(
                                            "inline-block mt-2 px-2 py-1 text-xs rounded-full",
                                            order.status === 'completed' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                        )}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-indigo-600">${order.product?.price}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                    {activeTab === 'buying' ? (
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Pickup PIN</p>
                                            <p className="text-xl font-mono font-bold tracking-widest">{order.pickup_pin}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            {order.status !== 'completed' && (
                                                <button
                                                    onClick={() => handleVerify(order.id)}
                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                                                >
                                                    Verify PIN
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <div className="text-center text-gray-500 py-10">
                                No orders found.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

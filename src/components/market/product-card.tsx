'use client'

import { useState } from 'react'
import { createOrder } from '@/lib/actions/market'
import { ShoppingCart } from 'lucide-react'

type Product = {
    id: string
    title: string
    description: string
    price: number
    image_url: string
}

export function ProductCard({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false)

    const handleBuy = async () => {
        if (!confirm(`Buy ${product.title} for $${product.price}?`)) return

        setLoading(true)
        const result = await createOrder(product.id)
        setLoading(false)

        if (result.success) {
            alert(`Order created! Your Pickup PIN is: ${result.pin}`)
        } else {
            alert('Error: ' + result.error)
        }
    }

    return (
        <div className="rounded-lg bg-white shadow-sm transition hover:shadow-md overflow-hidden">
            <div className="aspect-video w-full bg-gray-200 object-cover">
                {/* Placeholder for image */}
                {product.image_url && <img src={product.image_url} alt={product.title} className="h-full w-full object-cover" />}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                    <button
                        onClick={handleBuy}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                    >
                        <ShoppingCart size={16} />
                        {loading ? '...' : 'Buy'}
                    </button>
                </div>
            </div>
        </div>
    )
}

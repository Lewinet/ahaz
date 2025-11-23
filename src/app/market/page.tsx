import { getProducts } from '@/lib/actions/market'
// Force dynamic rendering
export const dynamic = 'force-dynamic'

import { ProductCard } from '@/components/market/product-card'
import { ModeSwitcher } from '@/components/ui/mode-switcher'

export default async function MarketPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
                <h1 className="text-xl font-bold text-indigo-900">Market</h1>
                <ModeSwitcher />
            </header>

            <main className="p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {products.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No products available.
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

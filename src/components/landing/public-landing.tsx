'use client'

import Link from 'next/link'
import { ArrowRight, Wallet, Car, ShoppingBag, Shield, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react'

export function PublicLanding() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Ahaz</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Your Digital Economy,
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> All in One Place</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Ahaz is the neo-bank super app that combines payments, ride-hailing, and marketplace in a seamless digital experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/login"
                                className="group px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                Start Free Today
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:shadow-lg transition-all font-semibold text-lg border border-gray-200 dark:border-gray-700">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10K+</div>
                            <div className="text-gray-600 dark:text-gray-400">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">$2M+</div>
                            <div className="text-gray-600 dark:text-gray-400">Transactions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50K+</div>
                            <div className="text-gray-600 dark:text-gray-400">Rides Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">99.9%</div>
                            <div className="text-gray-600 dark:text-gray-400">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">One app for all your daily needs</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Wallet */}
                        <div className="group p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl hover:shadow-xl transition-all border border-indigo-100 dark:border-indigo-800">
                            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Wallet className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Digital Wallet</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Send, receive, and manage your money instantly. Zero fees on transfers.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
                                    Instant transfers
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
                                    Transaction history
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
                                    Multi-currency support
                                </li>
                            </ul>
                        </div>

                        {/* Rides */}
                        <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl hover:shadow-xl transition-all border border-blue-100 dark:border-blue-800">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Car className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ride Hailing</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Get a ride in minutes. Safe, affordable, and reliable transportation.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-blue-600 dark:text-blue-400" />
                                    Real-time tracking
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-blue-600 dark:text-blue-400" />
                                    Upfront pricing
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-blue-600 dark:text-blue-400" />
                                    24/7 availability
                                </li>
                            </ul>
                        </div>

                        {/* Market */}
                        <div className="group p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl hover:shadow-xl transition-all border border-orange-100 dark:border-orange-800">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Marketplace</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Shop from local sellers. Fast delivery and secure payments.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-orange-600 dark:text-orange-400" />
                                    Verified sellers
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-orange-600 dark:text-orange-400" />
                                    Secure checkout
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-orange-600 dark:text-orange-400" />
                                    Order tracking
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Ahaz */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Ahaz?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Built for the modern digital economy</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-green-600 dark:text-green-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bank-Level Security</h3>
                            <p className="text-gray-600 dark:text-gray-300">Your data is encrypted and protected with industry-leading security standards.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="text-purple-600 dark:text-purple-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-300">Instant transactions and real-time updates. No waiting, no delays.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-blue-600 dark:text-blue-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community Driven</h3>
                            <p className="text-gray-600 dark:text-gray-300">Join thousands of users building the future of digital commerce.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-indigo-100 mb-8">Join Ahaz today and experience the future of digital finance.</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
                    >
                        Create Free Account
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">A</span>
                                </div>
                                <span className="text-xl font-bold text-white">Ahaz</span>
                            </div>
                            <p className="text-sm">Your all-in-one digital economy platform.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-3">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-3">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-3">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2025 Ahaz. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

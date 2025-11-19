import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navigation Bar */}
            <nav className="bg-slate-900 border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <a href="/" className="text-2xl font-bold text-white font-serif">QuickVessel</a>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Home</a>
                                <a href="/about" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium">About</a>
                                <a href="/services" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Services</a>
                                <a href="/contact" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Contact</a>
                                <a href="/app" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 relative overflow-hidden">
                {/* Abstract Graphics Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full opacity-30 blur-lg"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-500 rounded-full opacity-15 blur-2xl"></div>
                    <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-400 rounded-full opacity-25 blur-lg"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-serif leading-tight">
                            About QuickVessel
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                            Transforming business operations through innovative BPO solutions and cutting-edge technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Our Story</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Founded in 2015, QuickVessel began with a simple mission: to revolutionize how businesses
                                handle their most critical operations. What started as a small team of process optimization
                                experts has grown into a global leader in Business Process Outsourcing.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 font-light">
                                Today, we serve over 20,000 clients worldwide, helping them streamline workflows,
                                reduce costs, and accelerate growth through our proven methodologies and advanced technology solutions.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Founded in 2015 with a vision for operational excellence
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Serving 20,000+ clients across 50+ countries
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    ISO 9001 & 27001 certified operations
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/company-story.png"
                                alt="QuickVessel Company Story"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values Section */}
            <section className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/mission-values-bg.png"
                        alt="Mission and Values Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Our Mission & Values</h2>
                        <p className="text-xl text-gray-300 font-light">The principles that guide everything we do</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Innovation</h3>
                            <p className="text-gray-300 font-light">Continuously advancing our technology and methodologies to deliver cutting-edge solutions.</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Excellence</h3>
                            <p className="text-gray-300 font-light">Maintaining the highest standards of quality and performance in every project we undertake.</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Partnership</h3>
                            <p className="text-gray-300 font-light">Building lasting relationships based on trust, transparency, and mutual success.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Leadership Team</h2>
                        <p className="text-xl text-gray-300 font-light">Meet the experts driving our success</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/ceo-profile.png"
                                    alt="CEO Profile"
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Grey Johnson</h3>
                            <p className="text-blue-400 mb-4">Chief Executive Officer</p>
                            <p className="text-gray-300 font-light">15+ years in business process optimization and strategic leadership.</p>
                        </div>
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/cto-profile.png"
                                    alt="CTO Profile"
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Michael Chen</h3>
                            <p className="text-blue-400 mb-4">Chief Technology Officer</p>
                            <p className="text-gray-300 font-light">Expert in automation technologies and digital transformation strategies.</p>
                        </div>
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <Image
                                    src="/images/coo-profile.png"
                                    alt="COO Profile"
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Kimberly Billingsley</h3>
                            <p className="text-blue-400 mb-4">Chief Operations Officer</p>
                            <p className="text-gray-300 font-light">Specialist in operational excellence and client relationship management.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/company-stats-bg.png"
                        alt="Company Statistics Background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-slate-900/85"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Our Impact</h2>
                        <p className="text-xl text-gray-300 font-light">Numbers that speak to our success</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl font-bold text-white">20K+</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Clients Served</h3>
                            <p className="text-gray-300 font-light">Global client base</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl font-bold text-white">99%</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Satisfaction Rate</h3>
                            <p className="text-gray-300 font-light">Client satisfaction</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl font-bold text-white">50+</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Countries</h3>
                            <p className="text-gray-300 font-light">Global presence</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl font-bold text-white">24/7</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2 font-serif">Support</h3>
                            <p className="text-gray-300 font-light">Always available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div>
                            <h3 className="text-3xl font-bold text-blue-400 mb-6 font-serif">QuickVessel</h3>
                            <p className="text-gray-300 font-light">Optimizing business workflows through professional BPO services.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-6 font-serif">Navigation</h4>
                            <ul className="space-y-3">
                                <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
                                <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
                                <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-6 font-serif">Services</h4>
                            <ul className="space-y-3">
                                <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Order Management</a></li>
                                <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Logistics</a></li>
                                <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Customer Support</a></li>
                                <li><a href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Automation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-6 font-serif">Connect</h4>
                            <ul className="space-y-3">
                                <li><a href="/app" className="text-gray-300 hover:text-blue-400 transition-colors">Track Shipment</a></li>
                                <li><a href="/app" className="text-gray-300 hover:text-blue-400 transition-colors">Client Portal</a></li>
                                <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Get Quote</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-700 mt-12 pt-8 text-center">
                        <p className="text-gray-400 font-light">© 2024 QuickVessel. All rights reserved. | Powered by QuickVessel Technology</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import Image from "next/image";

export default function Services() {
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
                                <a href="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">About</a>
                                <a href="/services" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium">Services</a>
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
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                            Comprehensive BPO solutions designed to optimize your business operations and drive growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Services Overview */}
            <section className="py-20 bg-slate-800 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/bpo-benefits.png"
                        alt="BPO Services Background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-slate-800/80"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Core Service Categories</h2>
                        <p className="text-xl text-gray-300 font-light">Tailored solutions for every business need</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Back Office Services</h3>
                            <p className="text-gray-300 mb-6 font-light">Streamline your administrative processes with our comprehensive back office support including data entry, document processing, and record management.</p>
                            <a href="#back-office" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                Learn More
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Ecommerce Support</h3>
                            <p className="text-gray-300 mb-6 font-light">Complete ecommerce management from product listing to customer service, helping you scale your online business efficiently.</p>
                            <a href="#ecommerce" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                Learn More
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Order Management</h3>
                            <p className="text-gray-300 mb-6 font-light">End-to-end order processing, tracking, and fulfillment solutions that ensure timely delivery and customer satisfaction.</p>
                            <a href="#order-management" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
                                Learn More
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Services Section */}
            <section id="back-office" className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/process-workflow-ng.png"
                        alt="Workflow Optimization Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Back Office Services</h2>
                        <p className="text-xl text-gray-300 font-light">Comprehensive administrative support for your business</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Data Entry & Processing</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Accurate data entry and validation</li>
                                    <li>• Document digitization and processing</li>
                                    <li>• Database management and maintenance</li>
                                    <li>• Quality assurance and error checking</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Document Management</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Document scanning and archiving</li>
                                    <li>• File organization and indexing</li>
                                    <li>• Digital workflow automation</li>
                                    <li>• Compliance and audit support</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Financial Processing</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Invoice processing and management</li>
                                    <li>• Accounts payable and receivable</li>
                                    <li>• Expense tracking and reporting</li>
                                    <li>• Financial data reconciliation</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Record Keeping</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Employee record management</li>
                                    <li>• Customer data maintenance</li>
                                    <li>• Compliance documentation</li>
                                    <li>• Historical data preservation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ecommerce Services Section */}
            <section id="ecommerce" className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Ecommerce Support Services</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Complete ecommerce management solutions that help you scale your online business efficiently.
                                From product management to customer service, we handle every aspect of your digital storefront.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Product catalog management and optimization
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Order processing and fulfillment
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Customer support and inquiry handling
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Inventory management and tracking
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/ecommerce-management.png"
                                alt="Ecommerce Management Services"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Management Services Section */}
            <section id="order-management" className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/order-management-bg.png"
                        alt="Order Management Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Order Management Services</h2>
                        <p className="text-xl text-gray-300 font-light">End-to-end order processing and fulfillment solutions</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Order Processing</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Automated order validation</li>
                                    <li>• Payment processing and verification</li>
                                    <li>• Order status tracking and updates</li>
                                    <li>• Exception handling and resolution</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Shipping & Logistics</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Multi-carrier integration</li>
                                    <li>• Real-time shipment tracking</li>
                                    <li>• Automated shipping labels</li>
                                    <li>• Delivery optimization</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Returns Management</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Streamlined return processing</li>
                                    <li>• Automated refund handling</li>
                                    <li>• Quality inspection services</li>
                                    <li>• Customer communication</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Customer Support</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• 24/7 multilingual support</li>
                                    <li>• Live chat and email support</li>
                                    <li>• Ticket management system</li>
                                    <li>• Customer satisfaction tracking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 font-serif">Ready to Transform Your Business?</h2>
                    <p className="text-xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
                        Let our experts help you optimize your operations and achieve your business goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                        >
                            Get Started Today
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="/app"
                            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                        >
                            Track Shipment
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
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

import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navigation Bar */}
            <nav className="bg-slate-900 border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-white font-serif">QuickVessel</h1>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="/" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium">Home</a>
                                <a href="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">About</a>
                                <a href="/services" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Services</a>
                                <a href="/contact" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Contact</a>
                                <a href="/support" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium">Support</a>
                                <a href="/auth" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">Login</a>
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
                            We Optimize Workflows to Unlock the Potential of Your Business
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                            Professional BPO services that streamline your operations, reduce costs, and accelerate growth through proven processes and cutting-edge technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/app"
                                className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                            >
                                Track Shipment
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href="/learn-more"
                                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                            >
                                Learn More
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Why Choose QuickVessel?</h2>
                        <p className="text-xl text-gray-300 font-light">Trusted by thousands of businesses worldwide</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">20K+</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">20,000+ Clients Served</h3>
                            <p className="text-gray-300 font-light">Proven track record of successful partnerships</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-lg font-bold text-white">HIPAA</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">HIPAA Compliant</h3>
                            <p className="text-gray-300 font-light">Highest standards of data protection and privacy</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-lg font-bold text-white">ISO</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">ISO 9001 & 27001</h3>
                            <p className="text-gray-300 font-light">Certified quality and information security management</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Two-Column Layout Section - Business Process Image */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Streamline Your Business Operations</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Our proven BPO solutions transform complex business processes into streamlined, efficient workflows.
                                From order management to customer support, we handle the details so you can focus on growth.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Automated workflow optimization
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Real-time process monitoring
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Scalable infrastructure solutions
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/business-process-optimization.png"
                                alt="Business Process Optimization"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Overview Section */}
            <section id="services" className="py-20 bg-slate-800 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/bpo-services-bg.png"
                        alt="BPO Services Background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-slate-800/80"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Our Core Services</h2>
                        <p className="text-xl text-gray-300 font-light">Comprehensive BPO solutions tailored to your business needs</p>
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
                            <a href="/services" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
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
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Ecommerce Support Services</h3>
                            <p className="text-gray-300 mb-6 font-light">Complete ecommerce management from product listing to customer service, helping you scale your online business efficiently.</p>
                            <a href="/services" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
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
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Order Management Services</h3>
                            <p className="text-gray-300 mb-6 font-light">End-to-end order processing, tracking, and fulfillment solutions that ensure timely delivery and customer satisfaction.</p>
                            <a href="/services" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
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
            <section className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/workflow-optimization-bg.png"
                        alt="Workflow Optimization Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Comprehensive BPO Solutions</h2>
                        <p className="text-xl text-gray-300 font-light">Detailed breakdown of our core service offerings</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Order Shipping & Logistics</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Real-time shipment tracking</li>
                                    <li>• Multi-carrier integration</li>
                                    <li>• Automated shipping labels</li>
                                    <li>• Delivery optimization</li>
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
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Inventory Management</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Real-time stock monitoring</li>
                                    <li>• Automated reorder points</li>
                                    <li>• Multi-location tracking</li>
                                    <li>• Demand forecasting</li>
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
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Product Returns Management</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Streamlined return processing</li>
                                    <li>• Automated refund handling</li>
                                    <li>• Quality inspection services</li>
                                    <li>• Customer communication</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Order Processing</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Automated order validation</li>
                                    <li>• Payment processing</li>
                                    <li>• Order status updates</li>
                                    <li>• Exception handling</li>
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
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Outsourcing & Automation</h3>
                                <ul className="text-gray-300 space-y-2 font-light">
                                    <li>• Process automation workflows</li>
                                    <li>• Custom software integration</li>
                                    <li>• Data migration services</li>
                                    <li>• Performance optimization</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Two-Column Layout Section - Team Collaboration */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <Image
                                src="/images/team-collaboration.png"
                                alt="Professional Team Collaboration"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Expert Team, Proven Results</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Our certified professionals bring decades of experience in business process optimization.
                                We combine cutting-edge technology with human expertise to deliver exceptional results.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Certified industry professionals
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    24/7 dedicated support teams
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Continuous training and development
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications and Awards Section */}
            <section className="py-20 bg-slate-800 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/security-compliance-bg.png"
                        alt="Security and Compliance Background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-slate-800/85"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Certifications & Recognition</h2>
                        <p className="text-xl text-gray-300 font-light">Committed to the highest standards of quality and security</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group-hover:scale-105">
                                <div className="text-4xl font-bold text-blue-400 mb-4">ISO 9001</div>
                                <p className="text-gray-300 font-light">Quality Management System</p>
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group-hover:scale-105">
                                <div className="text-4xl font-bold text-blue-400 mb-4">ISO 27001</div>
                                <p className="text-gray-300 font-light">Information Security Management</p>
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group-hover:scale-105">
                                <div className="text-4xl font-bold text-blue-400 mb-4">HIPAA</div>
                                <p className="text-gray-300 font-light">Health Information Privacy</p>
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group-hover:scale-105">
                                <div className="text-4xl font-bold text-blue-400 mb-4">SOC 2</div>
                                <p className="text-gray-300 font-light">Security & Availability</p>
                            </div>
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

import Image from "next/image";

export default function LearnMore() {
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
                            Learn More
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                            Discover how our BPO solutions can transform your business operations and drive sustainable growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why BPO Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Why Choose BPO Services?</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Business Process Outsourcing isn't just about cost savings—it's about strategic transformation.
                                Our BPO services help you focus on core competencies while we handle the operational complexities.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Focus on core business activities and strategic growth
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Access to specialized expertise and advanced technology
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Scalable solutions that grow with your business
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Improved operational efficiency and cost reduction
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/bpo-benefits.png"
                                alt="BPO Benefits and Advantages"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Overview Section */}
            <section className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/process-workflow-bg.png"
                        alt="Process Workflow Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Our Process</h2>
                        <p className="text-xl text-gray-300 font-light">How we transform your business operations</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Discovery</h3>
                            <p className="text-gray-300 font-light">We analyze your current processes, identify pain points, and understand your business objectives.</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Strategy</h3>
                            <p className="text-gray-300 font-light">We develop a customized solution strategy tailored to your specific needs and goals.</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Implementation</h3>
                            <p className="text-gray-300 font-light">We deploy our solutions with minimal disruption to your existing operations.</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-2xl font-bold text-white">4</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Optimization</h3>
                            <p className="text-gray-300 font-light">We continuously monitor and optimize processes to ensure maximum efficiency and results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Technology & Tools</h2>
                        <p className="text-xl text-gray-300 font-light">Cutting-edge technology powering our solutions</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Automation Platforms</h3>
                            <p className="text-gray-300 font-light">Advanced RPA and workflow automation tools that streamline repetitive tasks and improve accuracy.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Cloud Infrastructure</h3>
                            <p className="text-gray-300 font-light">Secure, scalable cloud-based systems that ensure reliability and global accessibility.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 group">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Analytics & Reporting</h3>
                            <p className="text-gray-300 font-light">Real-time dashboards and comprehensive reporting tools that provide insights into performance and opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-20 bg-slate-900 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/success-stories-bg.png"
                        alt="Success Stories Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Success Stories</h2>
                        <p className="text-xl text-gray-300 font-light">Real results from our client partnerships</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                                    <span className="text-xl font-bold text-white">E</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white font-serif">E-commerce Retailer</h3>
                                    <p className="text-gray-400">Fashion & Apparel</p>
                                </div>
                            </div>
                            <p className="text-gray-300 font-light mb-6">
                                "QuickVessel transformed our order processing operations, reducing fulfillment time by 60%
                                and improving customer satisfaction scores by 40%. Their expertise in e-commerce logistics
                                has been invaluable to our growth."
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-400">60%</div>
                                    <div className="text-sm text-gray-400">Faster Fulfillment</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-400">40%</div>
                                    <div className="text-sm text-gray-400">Higher Satisfaction</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                                    <span className="text-xl font-bold text-white">M</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white font-serif">Manufacturing Company</h3>
                                    <p className="text-gray-400">Industrial Equipment</p>
                                </div>
                            </div>
                            <p className="text-gray-300 font-light mb-6">
                                "The back office support services provided by QuickVessel have streamlined our administrative
                                processes significantly. We've seen a 45% reduction in processing costs and improved data accuracy by 95%."
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-green-400">45%</div>
                                    <div className="text-sm text-gray-400">Cost Reduction</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-400">95%</div>
                                    <div className="text-sm text-gray-400">Data Accuracy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI Calculator Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Calculate Your ROI</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                See how much you could save and improve efficiency with our BPO services.
                                Use our calculator to estimate the potential impact on your business.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Average 30-50% cost reduction in outsourced processes
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Improved accuracy and reduced error rates
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Faster processing times and better customer satisfaction
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Access to advanced technology and expertise
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/roi-calculator.png"
                                alt="ROI Calculator Interface"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 font-serif">Ready to Learn More?</h2>
                    <p className="text-xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
                        Schedule a consultation with our experts to discuss how our BPO services can benefit your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                        >
                            Schedule Consultation
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="/services"
                            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                        >
                            View Services
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

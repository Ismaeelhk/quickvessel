import Image from "next/image";

export default function Contact() {
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
                                <a href="/contact" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium">Contact</a>
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
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                            Ready to transform your business operations? Get in touch with our experts today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Get In Touch</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                                        placeholder="Your Company Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="back-office">Back Office Services</option>
                                        <option value="ecommerce">Ecommerce Support</option>
                                        <option value="order-management">Order Management</option>
                                        <option value="customer-support">Customer Support</option>
                                        <option value="automation">Automation & Outsourcing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                                        placeholder="Tell us about your business needs and how we can help..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
                                >
                                    Send Message
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Contact Information</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Multiple ways to reach our team and get the support you need.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 font-serif">Email</h3>
                                        <p className="text-gray-300 font-light">quickvesselvercel@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 font-serif">Phone</h3>
                                        <p className="text-gray-300 font-light">+ 1 (256) 295-0024 • <a href="wa.me/12562950024">Chat on Whatsapp</a></p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 font-serif">Address</h3>
                                        <p className="text-gray-300 font-light">42 San Juan Dr.</p>
                                        <p className="text-gray-300 font-light">Jackson Heights</p>
                                        <p className="text-gray-300 font-light">New York, NY 11372</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 font-serif">Business Hours</h3>
                                        <p className="text-gray-300 font-light">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-300 font-light">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-300 font-light">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Two-Column Layout Section - Office Image */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Visit Our Office</h2>
                            <p className="text-xl text-gray-300 mb-8 font-light">
                                Our modern office space is designed to foster collaboration and innovation.
                                We welcome clients and partners to visit us and see our operations in action.
                            </p>
                            <ul className="space-y-4 text-gray-300 font-light">
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    State-of-the-art technology infrastructure
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Dedicated client meeting rooms
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Secure data processing facilities
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Easy access to public transportation
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/company-story.png"
                                alt="QuickVessel Office Building"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-slate-800 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/faq-background.png"
                        alt="FAQ Background"
                        fill
                        className="object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-slate-800/90"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-300 font-light">Common questions about our services and processes</p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-3 font-serif">How quickly can you start working on my project?</h3>
                            <p className="text-gray-300 font-light">We typically begin new projects within 2-3 business days after contract signing. For urgent requests, we can expedite the process to start within 24 hours.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-3 font-serif">What security measures do you have in place?</h3>
                            <p className="text-gray-300 font-light">We maintain ISO 27001 and SOC 2 certifications, implement end-to-end encryption, conduct regular security audits, and ensure all team members undergo comprehensive security training.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-3 font-serif">Do you offer 24/7 support?</h3>
                            <p className="text-gray-300 font-light">Yes, we provide 24/7 support for all our clients. Our dedicated support team is always available to assist with any issues or questions you may have.</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-3 font-serif">Can you scale services based on my business needs?</h3>
                            <p className="text-gray-300 font-light">Absolutely. Our flexible service model allows us to scale up or down based on your business requirements, ensuring you only pay for what you need.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 font-serif">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
                        Contact us today for a free consultation and discover how we can transform your business operations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#contact-form"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                        >
                            Start Your Project
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

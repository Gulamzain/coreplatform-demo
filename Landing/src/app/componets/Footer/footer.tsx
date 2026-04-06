// footer.tsx
"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import * as Icon from 'react-feather';

import { FaRegEnvelope, FaLinkedin, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTelegram, FaDiscord } from 'react-icons/fa';
import { MdKeyboardArrowRight } from "react-icons/md"

interface FooterLink {
    liClass: string;
    route: string;
    title: string;
}

interface FooterCompany {
    liClass: string;
    route: string;
    title: string;
}

export default function Footer() {
    const footerLinks = [
        {
            liClass: '',
            route: '/page-terms',
            title: 'Terms of Services',
        },
        {
            liClass: 'mt-2.5',
            route: '/page-privacy',
            title: 'Privacy Policy',
        },
        {
            route: '/documentation',
            title: 'Documentation',
            liClass: 'mt-2.5',
        },
        {
            route: '/changelog',
            title: 'Changelog',
            liClass: 'mt-2.5',
        },
        {
            route: '/faq',
            title: 'FAQ',
            liClass: 'mt-2.5',
        },
        {
            route: '/risk-disclosure',
            title: 'Risk Disclosure',
            liClass: 'mt-2.5',
        }
    ];
    
    const footerCompany = [
        {
            liClass: '',
            route: '/page-aboutus',
            title: 'About us',
        },
        {
            liClass: 'mt-2.5',
            route: '/page-services',
            title: 'Services',
        },
        {
            route: '/page-team',
            title: 'Team',
            liClass: 'mt-2.5',
        },
        {
            route: '/page-pricing',
            title: 'Pricing',
            liClass: 'mt-2.5',
        },
        {
            route: '/markets',
            title: 'Markets',
            liClass: 'mt-2.5',
        },
        {
            route: '/blog',
            title: 'Blog',
            liClass: 'mt-2.5',
        },
        {
            route: '/auth-login',
            title: 'Login',
            liClass: 'mt-2.5',
        },
        {
            route: '/auth-signup',
            title: 'Sign Up',
            liClass: 'mt-2.5',
        }
    ];

    const paymentMethods = [
        { name: 'Visa', icon: '/images/payments/visa.png' },
        { name: 'Mastercard', icon: '/images/payments/master-card.png' },
        { name: 'PayPal', icon: '/images/payments/paypal.png' },
        { name: 'American Express', icon: '/images/payments/american-ex.png' },
        { name: 'Discover', icon: '/images/payments/discover.png' },
    ];

    return (
        <div>
            <footer className="relative bg-black text-gray-200">
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="py-12 md:py-15 px-0">
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-8 md:gap-7.5">
                                    
                                    {/* About FOXNANCE */}
                                    <div className="lg:col-span-4 md:col-span-12">
                                        <Link href="/" className="inline-block focus:outline-none">
                                            <Image 
                                                src="/images/FoxnanceMain.png" 
                                                width={180} 
                                                height={48} 
                                                alt="FOXNANCE"
                                                className="footer-logo"
                                                style={{ height: 'auto', width: 'auto', maxWidth: '180px' }}
                                                priority
                                            />
                                        </Link>
                                        <p className="mt-6 text-gray-400 text-sm leading-relaxed">
                                            The risk of loss in online trading of stocks, options, futures, currencies, foreign equities, 
                                            and fixed income can be substantial. FOXNANCE is a trusted broker with 15+ years of experience 
                                            serving 500,000+ clients worldwide.
                                        </p>
                                        
                                        {/* Regulatory Badges */}
                                        <div className="mt-4 flex flex-wrap gap-2 justify-start md:justify-start">
                                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">FINRA</span>
                                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">SIPC</span>
                                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">NASDAQ: FOXN</span>
                                            <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">S&P 500</span>
                                        </div>

                                        {/* Social Links */}
                                        <ul className="list-none mt-5 flex flex-wrap gap-2 justify-start md:justify-start">
                                            <li>
                                                <Link href="https://facebook.com/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaFacebookF className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://twitter.com/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaTwitter className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://linkedin.com/company/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaLinkedin className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://instagram.com/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaInstagram className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://youtube.com/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaYoutube className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://t.me/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaTelegram className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://discord.gg/foxnance" target="_blank" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaDiscord className='text-sm'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="mailto:support@foxnance.com" 
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaRegEnvelope className="text-sm"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Company Links */}
                                    <div className="lg:col-span-2 md:col-span-4">
                                        <h5 className="tracking-[1px] text-white font-semibold text-lg mb-4">Company</h5>
                                        <ul className="list-none footer-list space-y-2.5">
                                            {footerCompany.map((data: FooterCompany, index: number) => (
                                                <li key={index}>
                                                    <Link href={data.route} className="text-gray-400 hover:text-[#3fcb1b] duration-500 ease-in-out flex items-center group">
                                                        <MdKeyboardArrowRight className="text-xl me-1 group-hover:translate-x-1 transition-transform" /> 
                                                        {data.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Useful Links */}
                                    <div className="lg:col-span-3 md:col-span-4">
                                        <h5 className="tracking-[1px] text-white font-semibold text-lg mb-4">Useful Links</h5>
                                        <ul className="list-none footer-list space-y-2.5">
                                            {footerLinks.map((data: FooterLink, index: number) => (
                                                <li key={index}>
                                                    <Link href={data.route} className="text-gray-400 hover:text-[#3fcb1b] duration-500 ease-in-out flex items-center group">
                                                        <MdKeyboardArrowRight className="text-xl me-1 group-hover:translate-x-1 transition-transform" /> 
                                                        {data.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Contact Info */}
                                        <div className="mt-8">
                                            <h6 className="text-white font-semibold mb-3">Contact Us</h6>
                                            <p className="text-gray-400 text-sm flex items-center gap-2 mb-2">
                                                <Icon.Phone className="w-4 h-4 flex-shrink-0" />
                                                <span>+1 (888) 123-4567</span>
                                            </p>
                                            <p className="text-gray-400 text-sm flex items-center gap-2">
                                                <Icon.MessageCircle className="w-4 h-4 flex-shrink-0" />
                                                <span>24/7 Live Support</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar with Payment Methods */}
                <div className="py-7.5 px-0 border-t border-gray-800">
                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 items-center gap-6">
                            <div className="md:text-start text-center">
                                <p className="mb-0 text-sm text-gray-500">
                                    © {new Date().getFullYear()} FOXNANCE Broker. All rights reserved. 
                                    <span className="mx-2">|</span>
                                    <Link href="/sitemap" className="text-gray-500 hover:text-[#3fcb1b] transition-colors">Sitemap</Link>
                                    <span className="mx-2">|</span>
                                    <Link href="/accessibility" className="text-gray-500 hover:text-[#3fcb1b] transition-colors">Accessibility</Link>
                                </p>
                            </div>

                            <div className="md:text-end text-center">
                                <p className="text-xs text-gray-600 mb-3">Accepted Payment Methods</p>
                                <ul className="list-none flex flex-wrap gap-3 justify-center md:justify-end">
                                    {paymentMethods.map((method, index) => (
                                        <li key={index}>
                                            <Link href="#" className="inline-block">
                                                <Image 
                                                    width={45} 
                                                    height={28} 
                                                    src={method.icon} 
                                                    className="max-h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" 
                                                    title={method.name} 
                                                    alt={method.name} 
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-600 leading-relaxed">
                                *Risk Warning: Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. 
                                The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not 
                                invest money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                /* Footer Responsive Styles */
                @media (max-width: 768px) {
                    footer .footer-list {
                        text-align: center;
                    }
                    
                    footer .footer-list li a {
                        justify-content: center;
                    }
                    
                    footer .flex.items-center {
                        justify-content: center;
                    }
                    
                    footer .gap-2 {
                        justify-content: center;
                    }
                    
                    footer .lg\\:col-span-4,
                    footer .lg\\:col-span-2,
                    footer .lg\\:col-span-3 {
                        text-align: center;
                    }
                    
                    footer h5,
                    footer h6 {
                        text-align: center;
                    }
                    
                    footer .mt-6,
                    footer .mt-8 {
                        text-align: center;
                    }
                    
                    .footer-logo {
                        margin: 0 auto;
                    }
                }
                
                /* Tablet Styles */
                @media (min-width: 769px) and (max-width: 1024px) {
                    footer .footer-list li a {
                        justify-content: flex-start;
                    }
                    
                    footer .lg\\:col-span-4,
                    footer .lg\\:col-span-2,
                    footer .lg\\:col-span-3 {
                        text-align: left;
                    }
                    
                    footer h5,
                    footer h6 {
                        text-align: left;
                    }
                    
                    footer .mt-6,
                    footer .mt-8 {
                        text-align: left;
                    }
                    
                    .footer-logo {
                        margin: 0;
                    }
                }
                
                /* Desktop Styles */
                @media (min-width: 1025px) {
                    footer .footer-list li a {
                        justify-content: flex-start;
                    }
                    
                    .footer-logo {
                        margin: 0;
                    }
                }
                
                /* Ensure images are responsive */
                footer img {
                    max-width: 100%;
                    height: auto;
                }
                
                /* Smooth hover transitions */
                footer a {
                    transition: all 0.3s ease;
                }
                
                /* Payment method icons hover effect */
                footer .opacity-60:hover {
                    opacity: 1;
                }
                
                /* Social icons spacing */
                footer ul.flex-wrap {
                    gap: 8px;
                }
                
                /* Make sure container doesn't overflow */
                .container {
                    width: 100%;
                    overflow-x: hidden;
                }
            `}</style>
        </div>
    )
}
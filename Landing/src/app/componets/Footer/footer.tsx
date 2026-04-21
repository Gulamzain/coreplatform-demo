// footer.tsx
"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import * as Icon from 'react-feather';

// Updated imports to include Payment Icons
import { 
    FaRegEnvelope, FaLinkedin, FaFacebookF, FaInstagram, 
    FaTwitter, FaYoutube, FaTelegram, FaDiscord,
    FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcDiscover 
} from 'react-icons/fa';
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
        { liClass: '', route: '/page-terms', title: 'Terms of Services' },
        { liClass: '', route: '/page-privacy', title: 'Privacy Policy' },
        { route: '/documentation', title: 'Documentation', liClass: '' },
        { route: '/changelog', title: 'Changelog', liClass: '' },
        { route: '/faq', title: 'FAQ', liClass: '' },
        { route: '/risk-disclosure', title: 'Risk Disclosure', liClass: '' }
    ];
    
    const footerCompany = [
        { liClass: '', route: '/page-aboutus', title: 'About us' },
        { liClass: '', route: '/page-services', title: 'Services' },
        { route: '/page-team', title: 'Team', liClass: '' },
        { route: '/page-pricing', title: 'Pricing', liClass: '' },
        { route: '/markets', title: 'Markets', liClass: '' },
        { route: '/blog', title: 'Blog', liClass: '' },
        { route: '/auth-login', title: 'Login', liClass: '' },
        { route: '/auth-signup', title: 'Sign Up', liClass: '' }
    ];

    // Updated to use React Components instead of image paths
  const paymentMethods = [
    { name: 'Visa', icon: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/visa.svg' },
    { name: 'Mastercard', icon: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/mastercard.svg' },
    { name: 'PayPal', icon: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/paypal.svg' },
    { name: 'American Express', icon: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/amex.svg' },
    { name: 'Discover', icon: 'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/discover.svg' },
];

    return (
        <div>
            <footer className="relative bg-black text-gray-200">
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="py-8 md:py-10 px-0">
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-6 md:gap-8">
                                    
                                    {/* About FOXNANCE */}
                                    <div className="lg:col-span-4 md:col-span-12">
                                        <Link href="/" className="inline-block focus:outline-none">
                                            <Image 
                                                src="/images/FoxnanceMain.png" 
                                                width={160} 
                                                height={42} 
                                                alt="FOXNANCE"
                                                className="footer-logo"
                                                style={{ height: 'auto', width: 'auto', maxWidth: '160px' }}
                                                priority
                                            />
                                        </Link>
                                        <p className="mt-4 text-gray-400 text-xs leading-relaxed max-w-md">
                                            The risk of loss in online trading of stocks, options, futures, currencies, foreign equities, 
                                            and fixed income can be substantial. FOXNANCE is a trusted broker with 15+ years of experience 
                                            serving 500,000+ clients worldwide.
                                        </p>
                                        
                                        {/* Regulatory Badges */}
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-gray-800 rounded-full text-[10px] text-gray-400">FINRA</span>
                                            <span className="px-2 py-0.5 bg-gray-800 rounded-full text-[10px] text-gray-400">SIPC</span>
                                            <span className="px-2 py-0.5 bg-gray-800 rounded-full text-[10px] text-gray-400">NASDAQ: FOXN</span>
                                            <span className="px-2 py-0.5 bg-gray-800 rounded-full text-[10px] text-gray-400">S&P 500</span>
                                        </div>

                                        {/* Social Links */}
                                        <ul className="list-none mt-4 flex flex-wrap gap-2">
                                            <li>
                                                <Link href="https://facebook.com/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaFacebookF className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://twitter.com/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaTwitter className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://linkedin.com/company/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaLinkedin className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://instagram.com/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaInstagram className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://youtube.com/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaYoutube className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://t.me/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaTelegram className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="https://discord.gg/foxnance" target="_blank" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaDiscord className='text-xs'/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="mailto:support@foxnance.com" 
                                                    className="size-7 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center border border-gray-700 text-gray-400 hover:text-white rounded-md hover:border-[#3fcb1b] hover:bg-[#3fcb1b] transition-all">
                                                    <FaRegEnvelope className="text-xs"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Company Links */}
                                    <div className="lg:col-span-2 md:col-span-4">
                                        <h5 className="tracking-[1px] text-white font-semibold text-sm mb-3">Company</h5>
                                        <ul className="list-none footer-list space-y-1.5">
                                            {footerCompany.map((data: FooterCompany, index: number) => (
                                                <li key={index}>
                                                    <Link href={data.route} className="text-gray-400 hover:text-[#3fcb1b] duration-500 ease-in-out flex items-center group text-xs">
                                                        <MdKeyboardArrowRight className="text-base me-1 group-hover:translate-x-1 transition-transform" /> 
                                                        {data.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Useful Links */}
                                    <div className="lg:col-span-3 md:col-span-4">
                                        <h5 className="tracking-[1px] text-white font-semibold text-sm mb-3">Useful Links</h5>
                                        <ul className="list-none footer-list space-y-1.5">
                                            {footerLinks.map((data: FooterLink, index: number) => (
                                                <li key={index}>
                                                    <Link href={data.route} className="text-gray-400 hover:text-[#3fcb1b] duration-500 ease-in-out flex items-center group text-xs">
                                                        <MdKeyboardArrowRight className="text-base me-1 group-hover:translate-x-1 transition-transform" /> 
                                                        {data.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Contact Info */}
                                        <div className="mt-4">
                                            <h6 className="text-white font-semibold text-sm mb-2">Contact Us</h6>
                                            <p className="text-gray-400 text-xs flex items-center gap-2 mb-1">
                                                <Icon.Phone className="w-3 h-3 flex-shrink-0" />
                                                <span>+1 (888) 123-4567</span>
                                            </p>
                                            <p className="text-gray-400 text-xs flex items-center gap-2">
                                                <Icon.MessageCircle className="w-3 h-3 flex-shrink-0" />
                                                <span>24/7 Live Support</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar with Payment Icons */}
                <div className="py-4 px-0 border-t border-gray-800">
    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
                <p className="mb-0 text-xs text-gray-500">
                    © {new Date().getFullYear()} FOXNANCE. All rights reserved. 
                    <span className="mx-2">|</span>
                    <Link href="/sitemap" className="text-gray-500 hover:text-[#3fcb1b] transition-colors">Sitemap</Link>
                    <span className="mx-2">|</span>
                    <Link href="/accessibility" className="text-gray-500 hover:text-[#3fcb1b] transition-colors">Accessibility</Link>
                </p>
            </div>

            <div className="text-center md:text-right">
    <p className="text-[10px] text-gray-400 mb-2 font-medium">Accepted Payment Methods</p>
    <ul className="list-none flex flex-wrap gap-2 justify-center md:justify-end items-center">
        {paymentMethods.map((method, index) => (
            <li key={index}>
                <div className="inline-block transition-transform hover:scale-105 duration-300">
                    <img 
                        src={method.icon} 
                        alt={method.name} 
                        title={method.name}
                        /* We use inline styles with !important to stop the global CSS from making them big */
                        style={{ 
                            height: '14px', 
                            width: 'auto', 
                            maxWidth: 'none', 
                            display: 'block' 
                        }}
                        className="opacity-90 hover:opacity-100"
                    />
                </div>
            </li>
        ))}
    </ul>
</div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-600 leading-relaxed">
                *Risk Warning: Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. 
                The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not 
                invest money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading.
            </p>
        </div>
    </div>
</div>
            </footer>

            <style jsx global>{`
                /* Footer Styles - Compact and Clean */
                footer {
                    width: 100%;
                    overflow: hidden;
                }
                
                /* Desktop Layout */
                @media (min-width: 1024px) {
                    footer .footer-list li a {
                        justify-content: flex-start;
                    }
                    .footer-logo {
                        margin: 0;
                    }
                }
                
                /* Tablet and Mobile */
                @media (max-width: 1024px) {
                    footer .footer-list li a {
                        justify-content: center;
                    }
                    footer h5, footer h6 {
                        text-align: center;
                    }
                    footer .lg\\:col-span-4,
                    footer .lg\\:col-span-2,
                    footer .lg\\:col-span-3 {
                        text-align: center;
                    }
                    footer .mt-4, footer .mt-3, footer .mt-8 {
                        text-align: center;
                    }
                    .footer-logo {
                        margin: 0 auto;
                    }
                    .flex-wrap {
                        justify-content: center;
                    }
                }
                
                /* Mobile Only */
                @media (max-width: 768px) {
                    footer .py-8 {
                        padding-top: 24px;
                        padding-bottom: 24px;
                    }
                    footer .gap-6 {
                        gap: 20px;
                    }
                    footer .text-xs {
                        font-size: 10px;
                    }
                    footer .text-sm {
                        font-size: 11px;
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
                
                /* Social icons */
                .size-7 {
                    width: 28px;
                    height: 28px;
                }
                
                /* Container overflow fix */
                .container {
                    width: 100%;
                    overflow-x: hidden;
                }
                
                /* Compact spacing */
                .space-y-1.5 > :not([hidden]) ~ :not([hidden]) {
                    margin-top: 0.375rem;
                }
            `}</style>
        </div>
    )
}
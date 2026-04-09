import React from "react";
import Link from "next/link";

import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import Wrapper from "../../components/wrapper";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

export default function Page() {
  return (
    <Wrapper>
       <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="md:flex justify-between items-center">
                    <h5 className="text-lg font-semibold">Privacy Policy</h5>

                    <ul className="tracking-[0.5px] inline-flex items-center sm:mt-0 mt-3">
                        <li className="inline-block capitalize text-[14px] font-bold duration-500 dark:text-white/70 hover:text-primary dark:hover:text-white"><Link href="/">Foxnance</Link></li>
                        <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><MdKeyboardArrowRight/></li>
                        <li className="inline-block capitalize text-[14px] font-bold text-primary dark:text-white" aria-current="page">Privacy</li>
                    </ul>
                </div>

                <div className="container relative mt-6">
                    <div className="md:flex justify-center">
                        <div className="lg:w-4/5 w-full">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 rounded-md">
                                <h5 className="text-lg font-semibold mb-4">Overview :</h5>
                                <p className="text-slate-400">At Foxnance, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our trading platform and services.</p>
                                <p className="text-slate-400 mt-3">We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy or our practices with regard to your personal information, please contact us.</p>
                                <p className="text-slate-400 mt-3">This privacy policy applies to all information collected through our website, mobile application, and any related services, sales, marketing, or events.</p>
                            
                                <h5 className="text-lg font-semibold mb-4 mt-6">We use your information to :</h5>
                                <ul className="list-none text-slate-400 mt-4">
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Process your trading transactions securely</li>
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Verify your identity and prevent fraud</li>
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Send you important account notifications</li>
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Improve our platform and user experience</li>
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Comply with regulatory requirements</li>
                                    <li className="flex mt-2 items-center"><FiArrowRight className="text-primary text-sm align-middle me-2"/>Provide customer support and assistance</li>
                                </ul>
    
                                <h5 className="text-lg font-semibold mb-4 mt-6">Information Provided Voluntarily :</h5>
                                <p className="text-slate-400">We collect information that you voluntarily provide to us when registering for an account, expressing an interest in our services, participating in activities, or contacting us. This includes personal information such as your name, email address, phone number, and government-issued identification for verification purposes.</p>
                                <p className="text-slate-400 mt-3">All personal information is encrypted and stored securely. We do not sell or rent your personal information to third parties. Your data is used solely for providing and improving our trading services.</p>
    
                                <h5 className="text-lg font-semibold mb-4 mt-6">Security of Your Information :</h5>
                                <p className="text-slate-400">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                                <p className="text-slate-400 mt-3">We implement industry-standard security protocols including 256-bit SSL encryption, two-factor authentication, and regular security audits to ensure your data remains protected.</p>
    
                                <h5 className="text-lg font-semibold mb-4 mt-6">Your Privacy Rights :</h5>
                                <p className="text-slate-400">Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your personal data. You may also have the right to data portability and to withdraw consent at any time.</p>
                                <p className="text-slate-400 mt-3">To exercise any of these rights, please contact our Data Protection Officer at privacy@foxnance.com. We will respond to your request within 30 days.</p>
    
                                <h5 className="text-lg font-semibold mb-4 mt-6">Cookies and Tracking Technologies :</h5>
                                <p className="text-slate-400">We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                                <p className="text-slate-400 mt-3">We use essential cookies to authenticate users and prevent fraudulent use of user accounts. We also use analytical cookies to improve our platform's performance and user experience.</p>
    
                                <div className="mt-6">
                                    <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-700 border-primary hover:border-primary-700 text-white rounded-md">Print Policy</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <Switcher/>
    </Wrapper>
  )
}
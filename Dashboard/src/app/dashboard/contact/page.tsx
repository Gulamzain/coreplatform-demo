// src/app/dashboard/contact/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiEnvelope, BiPhone, BiMap, BiSend, BiCheck, BiLogoWhatsapp } from 'react-icons/bi';
import { FaTelegram, FaDiscord, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our support team</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Have questions? We're here to help 24/7</p>
          
          <div className="info-list">
            <div className="info-item"><BiEnvelope size={20} /><div><strong>Email</strong><span>support@foxnance.com</span></div></div>
            <div className="info-item"><BiPhone size={20} /><div><strong>Phone</strong><span>+1 (888) 123-4567</span></div></div>
            <div className="info-item"><BiMap size={20} /><div><strong>Address</strong><span>123 Trading Street, New York, NY 10001</span></div></div>
            <div className="info-item"><FaClock size={20} /><div><strong>Support Hours</strong><span>24/7 Live Support</span></div></div>
          </div>

          <div className="social-links">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <button className="social-icon whatsapp"><BiLogoWhatsapp size={20} /></button>
              <button className="social-icon telegram"><FaTelegram size={20} /></button>
              <button className="social-icon discord"><FaDiscord size={20} /></button>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
            <textarea rows={5} placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
            <button type="submit" className="send-btn"><BiSend size={16} /> Send Message</button>
          </form>
          {isSubmitted && <div className="success-toast"><BiCheck size={20} /> Message sent successfully!</div>}
        </div>
      </div>

      <style jsx>{`
        .contact-page { max-width: 1200px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 32px; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }

        .contact-info, .contact-form { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 32px; }
        .contact-info h3, .contact-form h3 { font-size: 24px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; }
        .contact-info p { color: var(--text-secondary); margin-bottom: 32px; }

        .info-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px; }
        .info-item { display: flex; align-items: center; gap: 16px; }
        .info-item svg { color: #3fcb1b; flex-shrink: 0; }
        .info-item strong { display: block; font-size: 14px; color: var(--text-primary); }
        .info-item span { font-size: 13px; color: var(--text-secondary); }

        .social-links h4 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 16px; }
        .social-icons { display: flex; gap: 12px; }
        .social-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; color: var(--text-primary); }
        .social-icon:hover { transform: translateY(-4px); }
        .social-icon.whatsapp:hover { background: #25D366; color: white; border-color: #25D366; }
        .social-icon.telegram:hover { background: #0088cc; color: white; border-color: #0088cc; }
        .social-icon.discord:hover { background: #5865F2; color: white; border-color: #5865F2; }

        .contact-form form { display: flex; flex-direction: column; gap: 16px; }
        .contact-form input, .contact-form textarea { padding: 14px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; color: var(--text-primary); font-size: 14px; }
        .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: #3fcb1b; }
        .send-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .send-btn:hover { transform: translateY(-2px); }

        .success-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; padding: 12px 24px; background: #10b981; color: white; border-radius: 12px; z-index: 1000; }
      `}</style>
    </div>
  );
}
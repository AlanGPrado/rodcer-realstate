'use client';

import { useState } from 'react';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your inquiry! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '' });
    };

    return (
        <section
            id="contact"
            className="relative py-24 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url(/contact-bg.jpg)' }}
        >
            <div className="absolute inset-0 gradient-overlay"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('contactHome.title')}
                    </h2>
                    <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
                        {t('contactHome.subtitle')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={`${t('contact.form.name')}*`}
                                className="w-full px-4 py-3 rounded-md bg-white/90 backdrop-blur-sm border-2 border-white focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={`${t('contact.form.email')}*`}
                                className="w-full px-4 py-3 rounded-md bg-white/90 backdrop-blur-sm border-2 border-white focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={`${t('contact.form.phone')}*`}
                                className="w-full px-4 py-3 rounded-md bg-white/90 backdrop-blur-sm border-2 border-white focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-black/80 cursor-pointer hover:bg-black/70 text-white font-semibold py-3 px-12 rounded-full transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide shadow-lg"
                        >
                            {t('contactHome.button')}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

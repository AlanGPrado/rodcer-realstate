'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-500">Cargando Mapa...</div>
});

import { useTranslation } from '../lib/i18n/useTranslation';

export default function ContactPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phone.length >= 10 && phoneRegex.test(phone);
    };

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            phone: '',
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = t('contact.error'); // Using generic error for now, or add specific key
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.error');
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = t('contact.error');
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('contact.error');
            isValid = false;
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = t('contact.error');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus('error');
            return;
        }

        setSubmitStatus('sending');

        try {
            // Web3Forms integration
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'ab39fd38-379a-43cb-9121-09617c8135cb', // Replace with your actual Web3Forms access key
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    interest: formData.interest,
                    message: formData.message,
                    subject: `Nuevo contacto de ${formData.name}${formData.interest ? ` - ${formData.interest}` : ' - Información General'}`,
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    interest: '',
                    message: '',
                });
                setErrors({ name: '', email: '', phone: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending form:', error);
            setSubmitStatus('error');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors({ ...errors, [field]: '' });
        }
        // Reset submit status when user modifies form
        if (submitStatus !== 'idle') {
            setSubmitStatus('idle');
        }
    };

    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />

            {/* Page Header */}
            <section
                className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/contact-hero.jpg)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10">{t('contact.title')}</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-gray-700 text-lg">
                                {t('contact.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-primary-green-dark mb-6">{t('contact.form.send')}</h2>

                                    {/* Status Messages */}
                                    {submitStatus === 'success' && (
                                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                            <i className="fas fa-check-circle mr-2"></i>
                                            {t('contact.success')}
                                        </div>
                                    )}
                                    {submitStatus === 'error' && Object.values(errors).some(e => e) && (
                                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                            <i className="fas fa-exclamation-circle mr-2"></i>
                                            {t('contact.error')}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder={`${t('contact.form.name')}*`}
                                                className={`w-full px-4 py-3 rounded-md border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                    } focus:border-accent-gold focus:outline-none transition-colors`}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder={`${t('contact.form.email')}*`}
                                                className={`w-full px-4 py-3 rounded-md border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    } focus:border-accent-gold focus:outline-none transition-colors`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder={`${t('contact.form.phone')}*`}
                                                className={`w-full px-4 py-3 rounded-md border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                    } focus:border-accent-gold focus:outline-none transition-colors`}
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* Interest Dropdown */}
                                        <div>
                                            <select
                                                value={formData.interest}
                                                onChange={(e) => handleInputChange('interest', e.target.value)}
                                                className="w-full px-4 py-3 rounded-md border-2 border-gray-300 focus:border-accent-gold focus:outline-none transition-colors bg-white"
                                            >
                                                <option value="">{t('contact.form.interest')}</option>
                                                <option value="Comprar">{t('contact.form.options.buy')}</option>
                                                <option value="Vender">{t('contact.form.options.sell')}</option>
                                                <option value="Rentar">{t('contact.form.options.rent')}</option>
                                                <option value="Información General">{t('contact.form.options.general')}</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                placeholder={t('contact.form.message')}
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-md border-2 border-gray-300 focus:border-accent-gold focus:outline-none transition-colors resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Submit Button */}
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={submitStatus === 'sending'}
                                                className="w-full bg-black/80 hover:bg-black/70 text-white font-semibold py-3 px-6 rounded-full transform 
                                                hover:-translate-y-0.5 transition-all duration-300 tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                                                 cursor-pointer">
                                                {submitStatus === 'sending' ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                                        {t('contact.form.sending')}
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-paper-plane mr-2"></i>
                                                        {t('contact.form.send')}
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Contact Information Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                                    <h3 className="text-xl font-bold text-primary-green-dark mb-6">{t('contact.title')}</h3>

                                    {/* Address */}
                                    <div className="mb-6">
                                        <div className="flex items-start mb-2">
                                            <i className="fas fa-map-marker-alt text-gray-500 text-xl mr-3 mt-1"></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.address')}</h4>
                                                <p className="text-gray-600 text-sm">
                                                    123 Main Street, Suite 100<br />
                                                    City, State 12345<br />
                                                    México
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="mb-6">
                                        <div className="flex items-start mb-2">
                                            <i className="fas fa-clock text-gray-500 text-xl mr-3 mt-1"></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.hours')}</h4>
                                                <p className="text-gray-600 text-sm">
                                                    Lunes a Viernes<br />
                                                    9:00 a.m. - 6:30 p.m.<br />
                                                    Sábados<br />
                                                    09:30 a.m. - 2:00 p.m.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-6">
                                        <div className="flex items-start mb-2">
                                            <i className="fas fa-phone text-gray-500 text-xl mr-3 mt-1"></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.phone')}</h4>
                                                <a href="tel:+1234567890" className="text-accent-gold hover:text-accent-gold/80 text-sm">
                                                    (123) 456-7890
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-6">
                                        <div className="flex items-start mb-2">
                                            <i className="fas fa-envelope text-gray-500 text-xl mr-3 mt-1"></i>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{t('contact.info.email')}</h4>
                                                <a href="mailto:info@rodcerstate.com" className="text-accent-gold hover:text-accent-gold/80 text-sm">
                                                    info@rodcerstate.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">{t('contact.info.followUs')}</h4>
                                        <div className="flex gap-3">
                                            <a
                                                href="#"
                                                className="w-10 h-10 bg-gray-600 hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a
                                                href="#"
                                                className="w-10 h-10 bg-gray-600 hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a
                                                href="#"
                                                className="w-10 h-10 bg-gray-600 hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="mt-12">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-primary-green-dark mb-6">{t('contact.location')}</h3>
                                <div className="h-96 rounded-lg overflow-hidden">
                                    <Map
                                        location="RodcerState Real Estate - Tampico Centro, Tamaulipas, México"
                                        coordinates={[22.2331, -97.8611]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

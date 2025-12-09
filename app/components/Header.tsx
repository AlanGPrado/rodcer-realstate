'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Header() {
    const { t, language, setLanguage } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 min-h-[100px] py-4">
            {/* Background Layer 1: Kelz Gradient (All pages, not scrolled) */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${!isScrolled ? 'opacity-100' : 'opacity-0'
                    } kelz-background-gradient`}
            />

            {/* Background Layer 2: Solid Primary Gradient (Scrolled) */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-100 shadow-lg' : 'opacity-0'
                    } bg-[#386020]`}
            />

            {/* Content Container */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 hidden lg:block">
                    <div className="flex items-center justify-between">
                        <div className="w-1/6 p-2">
                            <Link href="/">
                                <Image
                                    src="/logo_new.png"
                                    alt="RodcerState - Real Estate Group"
                                    width={124}
                                    height={79}
                                />
                            </Link>
                        </div>
                        <div className="w-5/6">
                            <div className="flex justify-end mb-2">
                                <ul className="flex gap-8 text-white text-sm">
                                    <li className="hover:text-gray-400 transition-colors" title='Call'>
                                        <a href="tel:1234567890" className="flex items-center gap-2 cursor-pointer">
                                            <i className="fa fa-phone-alt text-accent-gold"></i>
                                            123 456 7890
                                        </a>
                                    </li>
                                    <li className="hover:text-gray-400 transition-colors" title='Email'>
                                        <a href="mailto:info@rodcerstate.com" className="flex items-center gap-2 cursor-pointer">
                                            <i className="fa fa-envelope text-accent-gold"></i>
                                            info@rodcerstate.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <nav className="flex justify-end pt-2">
                                <ul className="flex gap-8 text-white font-medium text-sm">
                                    <li>
                                        <Link href="/" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.home')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                 group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/nosotros" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.about')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                  group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/propiedades" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.properties')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                  group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/agentes" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.agents')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                  group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/servicios" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.services')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                  group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contacto" className="hover:text-accent-light transition-colors relative group">
                                            {t('header.contact')}
                                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-0 bg-green-500 
                   group-hover:w-full transition-all duration-300 ease-out origin-center"></span>
                                        </Link>
                                    </li>
                                    <li className="relative group">
                                        <button
                                            className="hover:text-gray-400 transition-colors flex items-center gap-1 cursor-pointer text-white"
                                            aria-label="Select Language"
                                        >
                                            <i className="fas fa-globe"></i>
                                            <span>{language.toUpperCase()}</span>
                                            <i className="fas fa-chevron-down text-xs ml-1 group-hover:translate-y-0.5 transition-transform"></i>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                                            <button
                                                onClick={() => setLanguage('es')}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${language === 'es' ? 'bg-gray-50 text-gray-700 font-black' : 'text-gray-700'
                                                    }`}
                                            >
                                                <span>Español</span>
                                                {language === 'es' && <i className="fas fa-check ml-auto text-gray-700 text-xs"></i>}
                                            </button>
                                            <button
                                                onClick={() => setLanguage('en')}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${language === 'en' ? 'bg-gray-50 text-gray-700 font-black' : 'text-gray-700'
                                                    }`}
                                            >
                                                <span>English</span>
                                                {language === 'en' && <i className="fas fa-check ml-auto text-gray-700 text-xs"></i>}
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="container mx-auto px-4 lg:hidden pb-3">
                    <div className="flex justify-end mb-2">
                        <ul className="flex gap-4 text-white text-xs">
                            <li className="flex items-center gap-1 relative group">
                                <button
                                    className="hover:text-accent-gold transition-colors flex items-center gap-1"
                                >
                                    <i className="fas fa-globe"></i>
                                    <span>{language.toUpperCase()}</span>
                                    <i className="fas fa-chevron-down text-xs ml-1 group-hover:translate-y-0.5 transition-transform"></i>
                                </button>

                                {/* Mobile Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                                    <button
                                        onClick={() => setLanguage('es')}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${language === 'es' ? 'bg-gray-50 text-primary-green font-semibold' : 'text-gray-700'
                                            }`}
                                    >
                                        <span className="text-lg">🇪🇸</span>
                                        <span>ES</span>
                                        {language === 'es' && <i className="fas fa-check ml-auto text-primary-green text-xs"></i>}
                                    </button>
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${language === 'en' ? 'bg-gray-50 text-primary-green font-semibold' : 'text-gray-700'
                                            }`}
                                    >
                                        <span className="text-lg">🇺🇸</span>
                                        <span>EN</span>
                                        {language === 'en' && <i className="fas fa-check ml-auto text-primary-green text-xs"></i>}
                                    </button>
                                </div>
                            </li>
                            <li className="flex items-center gap-1">
                                <i className="fa fa-phone-alt text-accent-gold"></i>
                                <a href="tel:1234567890">123 456 7890</a>
                            </li>
                            <li className="flex items-center gap-1">
                                <i className="fa fa-envelope text-accent-gold"></i>
                                <a href="mailto:info@rodcerstate.com">info@rodcerstate.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="RodcerState"
                                width={80}
                                height={50}
                            />
                        </Link>
                        <button className="text-white text-2xl">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

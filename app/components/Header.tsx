'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Header() {
    const { t, language, setLanguage } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 lg:min-h-[100px] lg:py-4">
            {/* Background Layer 1: Kelz Gradient (All pages, not scrolled) */}
            <div
                className={`hidden lg:block absolute inset-0 transition-opacity duration-500 ease-in-out ${!isScrolled ? 'opacity-100' : 'opacity-0'
                    } kelz-background-gradient`}
            />

            {/* Background Layer 2: Solid Primary Gradient (Scrolled) */}
            <div
                className={`hidden lg:block absolute inset-0 transition-opacity duration-500 ease-in-out ${isScrolled ? 'opacity-100 shadow-lg' : 'opacity-0'
                    } bg-[#386020]`}
            />

            {/* Content Container */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 hidden lg:block">
                    <div className="flex items-start justify-between">
                        <div
                            className="relative p-2"
                            style={{
                                width: "124px",
                                height: "79px",
                            }}
                        >
                            <Link href="/">
                                <Image
                                    src="/logo_new.png"
                                    alt="RodcerState - Real Estate Group"
                                    fill
                                    className="object-contain"
                                    sizes="124px"
                                    priority
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
                                                className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${language === 'es' ? 'bg-green-50 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <span>🇲🇽 Español</span>
                                                {language === 'es' && <i className="fas fa-check ml-auto text-primary-green text-xs"></i>}
                                            </button>
                                            <button
                                                onClick={() => setLanguage('en')}
                                                className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${language === 'en' ? 'bg-green-50 text-black ' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <span>🇺🇸 English</span>
                                                {language === 'en' && <i className="fas fa-check ml-auto text-primary-green text-xs"></i>}
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>


            </div>

            {/* Mobile Header (Visible on small screens) */}
            <div className={`lg:hidden relative z-10 transition-colors duration-300 backdrop-blur-[1px] ${isScrolled ? 'bg-[#376020] shadow-md' : 'kelz-background-gradient'
                }`}>
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div
                        className="relative"
                        style={{
                            width: "80px",
                            height: "50px",
                        }}
                    >
                        <Link href="/">
                            <Image
                                src="/logo_new.png"
                                alt="RodcerState"
                                fill
                                className="object-contain"
                                sizes="100px"
                                priority
                            />
                        </Link>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white text-2xl p-2 focus:outline-none"
                    >
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                        }`}
                >
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-sm font-bold hover:text-accent-gold transition-colors pb-2 border-b border-gray-100 ${isHome ? 'text-accent-gold' : 'text-gray-800'
                                }`}
                        >
                            {t('header.home')}
                        </Link>
                        <Link
                            href="/nosotros"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold text-gray-800 hover:text-accent-gold transition-colors pb-2 border-b border-gray-100"
                        >
                            {t('header.about')}
                        </Link>
                        <Link
                            href="/propiedades"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-sm font-bold hover:text-accent-gold transition-colors pb-2 border-b border-gray-100 ${pathname === '/propiedades' ? 'text-accent-gold' : 'text-gray-800'
                                }`}
                        >
                            {t('header.properties')}
                        </Link>
                        <Link
                            href="/agentes"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-sm font-bold hover:text-accent-gold transition-colors pb-2 border-b border-gray-100 ${pathname === '/agentes' ? 'text-accent-gold' : 'text-gray-800'
                                }`}
                        >
                            {t('header.agents')}
                        </Link>
                        <Link
                            href="/servicios"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-sm font-bold hover:text-accent-gold transition-colors pb-2 border-b border-gray-100 ${pathname === '/servicios' ? 'text-accent-gold' : 'text-gray-800'
                                }`}
                        >
                            {t('header.services')}
                        </Link>
                        <Link
                            href="/contacto"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold text-gray-800 hover:text-accent-gold transition-colors pb-2 border-b border-gray-100"
                        >
                            {t('header.contact')}
                        </Link>

                        {/* Mobile Language Selector */}
                        <div className="flex gap-4 pt-2">
                            <button
                                onClick={() => {
                                    setLanguage('es');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${language === 'es' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <span className="text-base">🇲🇽</span> ES
                            </button>
                            <button
                                onClick={() => {
                                    setLanguage('en');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <span className="text-base">🇺🇸</span> EN
                            </button>
                        </div>

                        {/* Mobile Contact Info */}
                        <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3 text-sm text-gray-600">
                            <a href="tel:1234567890" className="flex items-center gap-2">
                                <i className="fa fa-phone-alt text-accent-gold"></i>
                                123 456 7890
                            </a>
                            <a href="mailto:info@rodcerstate.com" className="flex items-center gap-2">
                                <i className="fa fa-envelope text-accent-gold"></i>
                                info@rodcerstate.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}

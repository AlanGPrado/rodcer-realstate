'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-100 border-t border-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-primary-green-dark mb-4">{t('footer.contactUs')}</h3>
                        <p className="text-gray-700 mb-4">
                            123 Main Street, Suite 100<br />
                            City, State 12345<br />
                            United States
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p>
                                <i className="fas fa-phone-alt text-gray-500 mr-2"></i>
                                <a href="tel:+11234567890" className="hover:text-gray-500 transition-colors hover:underline">
                                    +1 123 456 7890
                                </a>
                            </p>
                            <p>
                                <i className="fas fa-envelope text-gray-500 mr-2"></i>
                                <a href="mailto:info@rodcerstate.com" className="hover:text-gray-500 transition-colors hover:underline">
                                    info@rodcerstate.com
                                </a>
                            </p>
                            <p>
                                <i className="fas fa-lock text-gray-500 mr-2"></i>
                                <Link href="/aviso-privacidad" className="hover:text-gray-500 transition-colors hover:underline">
                                    Aviso de Privacidad
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold text-primary-green-dark mb-4">{t('agentDetail.followSocial')}</h3>
                        <p className="text-gray-700 mb-4">
                            {t('agentDetail.followText')}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-primary-green text-white flex items-center justify-center hover:bg-accent-green transition-all"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook text-xl text-gray-500"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-primary-green text-white flex items-center justify-center hover:bg-accent-green transition-all"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram text-xl text-gray-500"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-primary-green text-white flex items-center justify-center hover:bg-accent-green transition-all"
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin-in text-xl text-gray-500"></i>
                            </a>
                        </div>
                    </div>

                    {/* Logos */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="h-24 relative shimmer-effect">
                            <Image
                                src="/logo_new.png"
                                alt="RodcerState Logo"
                                width={120}
                                height={96}
                                className="h-24 w-24 object-contain"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                        </div>
                        <div className="h-24 relative shimmer-effect">
                            <Image
                                src="/logo_new.png"
                                alt="Association Logo"
                                width={120}
                                height={96}
                                className="h-24 w-24 object-contain opacity-70"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                        </div>
                        <div className="h-24 relative shimmer-effect">
                            <Image
                                src="/logo_new.png"
                                alt="Realtor Logo"
                                width={120}
                                height={96}
                                className="h-24 w-24 object-contain opacity-70"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-300 py-4 bg-gray-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-600 text-sm">
                        © 2025 RodcerState Real Estate Group. {t('footer.allRightsReserved')}.
                    </p>
                </div>
            </div>
        </footer>
    );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useTranslation } from '../lib/i18n/useTranslation';

export default function ServicesPage() {
    const { t } = useTranslation();

    const services = [
        {
            id: 1,
            title: t('services.items.0.title'), // Compra y Venta
            description: t('services.items.0.description'),
            icon: 'fa-home',
            image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 2,
            title: t('services.items.1.title'), // Renta de Propiedades
            description: t('services.items.1.description'),
            icon: 'fa-key',
            image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 3,
            title: t('services.items.2.title'), // Asesoría Legal
            description: t('services.items.2.description'),
            icon: 'fa-gavel',
            image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 4,
            title: t('services.items.3.title'), // Valuación de Inmuebles
            description: t('services.items.3.description'),
            icon: 'fa-chart-line',
            image: 'https://images.pexels.com/photos/7578966/pexels-photo-7578966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            id: 5,
            title: t('services.items.4.title'), // Inversión Inmobiliaria
            description: t('services.items.4.description'),
            icon: 'fa-coins',
            image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ];
    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />

            {/* Page Header */}
            <section
                className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/services-hero.jpg)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10">{t('services.title')}</h1>
                    <p className="text-lg opacity-90">
                        <Link href="/" className="hover:text-accent-gold transition-colors">{t('header.home')}</Link>
                        <span className="mx-2">/</span>
                        <span>{t('header.services')}</span>
                    </p>
                </div>
            </section>

            {/* Services Introduction */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-green-dark mb-6">
                        {t('services.introTitle')}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {t('services.introText')}
                    </p>
                </div>
            </section>

            {/* Services Bento Box Grid */}
            <section className="pb-20 container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                    {/* Large Card - Compra y Venta */}
                    <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
                        <a href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow shimmer-effect">
                            <Image
                                src={services[0].image}
                                alt={services[0].title}
                                fill
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/40"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
                                    {services[0].title}
                                </h3>
                            </div>
                        </a>
                    </div>

                    {/* Middle Column */}
                    <div className="col-span-2 sm:col-span-1 md:col-span-2">
                        {/* Renta de Propiedades */}
                        <a href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-50 mb-4 shimmer-effect">
                            <Image
                                src={services[1].image}
                                alt={services[1].title}
                                fill
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/40"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4">
                                    {services[1].title}
                                </h3>
                            </div>
                        </a>

                        {/* Bottom 2 cards */}
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                            {/* Asesoría Legal */}
                            <a href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-50 shimmer-effect">
                                <Image
                                    src={services[2].image}
                                    alt={services[2].title}
                                    fill
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.parentElement?.classList.add('loaded');
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center px-2">
                                        {services[2].title}
                                    </h3>
                                </div>
                            </a>

                            {/* Valuación */}
                            <a href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-50 shimmer-effect">
                                <Image
                                    src={services[3].image}
                                    alt={services[3].title}
                                    fill
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.parentElement?.classList.add('loaded');
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center px-2">
                                        {services[3].title}
                                    </h3>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Tall Card - Inversión */}
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
                        <a href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow shimmer-effect">
                            <Image
                                src={services[4].image}
                                alt={services[4].title}
                                fill
                                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onLoad={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.parentElement?.classList.add('loaded');
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/40"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4">
                                    {services[4].title}
                                </h3>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-primary-green text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        {t('services.cta.title')}
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        {t('services.cta.text')}
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-block bg-gray-100 text-primary-green-dark font-bold py-4 px-10 rounded-full hover:bg-gray-200 duration-300 shadow-lg text-black transform transition-all duration-300 tracking-wide hover:-translate-y-0.5"                        >
                        {t('services.cta.button')}
                    </Link>

                </div>
            </section>

            <Footer />
        </main>
    );
}

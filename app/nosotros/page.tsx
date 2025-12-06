'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Agents from '../components/Agents';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function AboutPage() {
    const { t } = useTranslation();

    const values = [
        {
            key: 'integrity',
            icon: 'fa-handshake'
        },
        {
            key: 'excellence',
            icon: 'fa-star'
        },
        {
            key: 'innovation',
            icon: 'fa-lightbulb'
        },
        {
            key: 'commitment',
            icon: 'fa-heart'
        }
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />

            {/* Hero Section */}
            <section
                className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/about-hero.jpg)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10">
                        {t('aboutPage.title')}
                    </h1>
                    <p className="text-lg opacity-90">
                        <Link href="/" className="hover:text-accent-gold transition-colors">
                            {t('header.home')}
                        </Link>
                        <span className="mx-2">/</span>
                        <span>{t('header.about')}</span>
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-green-dark mb-6 relative inline-block">
                            {t('aboutPage.storyTitle')}
                            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-accent-gold"></span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {t('aboutPage.storyText')}
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/about-placeholder.jpg"
                            alt="Our Story"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-bullseye text-3xl text-gray-500"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-primary-green-dark mb-4">
                                {t('aboutPage.missionTitle')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('aboutPage.missionText')}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6">
                                <i className="fas fa-eye text-3xl text-gray-500"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-primary-green-dark mb-4">
                                {t('aboutPage.visionTitle')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('aboutPage.visionText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-green-dark mb-4">
                        {t('aboutPage.valuesTitle')}
                    </h2>
                    <div className="w-24 h-1 bg-accent-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => (
                        <div key={value.key} className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <i className={`fas ${value.icon} text-3xl text-gray-500 group-hover:text-accent-gold transition-colors`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {t(`aboutPage.values.${value.key}`)}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t(`aboutPage.values.${value.key}Desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <Agents />

            {/* CTA */}
            <section className="py-20 bg-primary-green text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        {t('aboutPage.cta.title')}
                    </h2>
                    <Link
                        href="/propiedades"
                        className="inline-block bg-gray-100 text-primary-green-dark font-bold py-4 px-10 rounded-full hover:bg-gray-200 duration-300 shadow-lg text-black transform transition-all duration-300 tracking-wide hover:-translate-y-0.5"                    >
                        {t('aboutPage.cta.button')}
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

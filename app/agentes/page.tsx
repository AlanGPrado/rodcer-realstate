'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { agents } from '../lib/agentData';

import { useTranslation } from '../lib/i18n/useTranslation';

export default function AgentsPage() {
    const { t } = useTranslation();
    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />

            {/* Page Header */}
            <section
                className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/agents-hero.jpg)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10 drop-shadow-lg">{t('agents.title')}</h1>
                    <p className="text-xl text-white/90 drop-shadow-md">
                        {t('agents.subtitle')}
                    </p>
                </div>
            </section>

            {/* Agents Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-green-dark mb-4">
                        {t('agents.meetOurAgents')}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t('agents.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {agents.map((agent) => (
                        <Link
                            key={agent.id}
                            href={`/agente/${agent.id}`}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group block"
                        >
                            <div className="relative h-80 overflow-hidden shimmer-effect">
                                <Image
                                    src={agent.image}
                                    alt={agent.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.parentElement?.classList.add('loaded');
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="flex justify-center gap-4 text-white">
                                        <a
                                            href={`tel:${agent.phone}`}
                                            className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center hover:bg-white hover:text-gray-500 transition-colors hover:text-black z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <i className="fas fa-phone-alt"></i>
                                        </a>
                                        <a
                                            href={`mailto:${agent.email}`}
                                            className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center hover:bg-white hover:text-gray-500 transition-colors hover:text-black z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                        <span className="w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center hover:bg-white hover:text-gray-500 transition-colors hover:text-black cursor-pointer">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-1 hover:text-accent-green transition-colors">
                                    {agent.name}
                                </h3>
                                <p className="text-accent-green font-medium mb-4">{agent.role}</p>

                                <div className="border-t border-gray-100 pt-4 flex flex-col items-center">
                                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                                        <i className="fas fa-phone-alt text-gray-500 mr-2"></i>
                                        {agent.phone}
                                    </p>
                                    <p className="text-gray-600 text-sm flex items-center">
                                        <i className="fas fa-envelope text-gray-500 mr-2"></i>
                                        {agent.email}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

'use client';

import { useState } from 'react';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Hero() {
    const { t } = useTranslation();
    const [searchData, setSearchData] = useState({
        operation: '',
        propertyType: '',
        location: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', searchData);
        // Implement search functionality
    };

    return (
        <section
            id="home"
            className="relative min-h-[66vh] flex items-center pt-24 pb-16 bg-cover bg-center bg-scroll md:bg-fixed"
            style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-white/90 drop-shadow-md">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 animate-fade-in-up animation-delay-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="md:col-span-1">
                                <select
                                    value={searchData.operation}
                                    onChange={(e) => setSearchData({ ...searchData, operation: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-400 rounded-md text-gray-700 focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green transition-all text-sm"
                                >
                                    <option value="">{t('hero.operationType')}</option>
                                    <option value="rent">{t('hero.rent')}</option>
                                    <option value="sale">{t('hero.sale')}</option>
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <select
                                    value={searchData.propertyType}
                                    onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-400 rounded-md text-gray-700 focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green transition-all text-sm"
                                >
                                    <option value="">{t('hero.propertyType')}</option>
                                    <option value="house">{t('hero.house')}</option>
                                    <option value="apartment">{t('hero.apartment')}</option>
                                    <option value="land">{t('hero.land')}</option>
                                    <option value="commercial">{t('hero.commercial')}</option>
                                </select>
                            </div>

                            <div className="md:col-span-1">
                                <input
                                    type="text"
                                    value={searchData.location}
                                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                    placeholder={t('hero.location')}
                                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-400 rounded-md text-gray-700 focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green transition-all text-sm"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <button
                                    type="submit"
                                    className="w-full bg-black/80 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-black/70 transition-all duration-300 tracking-wide text-sm shadow-md cursor-pointer"
                                >
                                    <i className="fas fa-search mr-2"></i>
                                    {t('hero.search')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease both;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
        </section >
    );
}

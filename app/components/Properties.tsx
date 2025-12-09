'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { useTranslation } from '../lib/i18n/useTranslation';
import { properties } from '../lib/propertyData';

export default function Properties() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1); // Mobile: 1 property
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2); // Tablet: 2 properties
            } else {
                setItemsPerView(3); // Desktop: 3 properties
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredProperties = properties.filter(
        property => activeTab === 'all' || property.type === activeTab
    );

    const maxIndex = Math.max(0, filteredProperties.length - itemsPerView);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        setResetKey((prev) => prev + 1);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
        setResetKey((prev) => prev + 1);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        setResetKey((prev) => prev + 1);
    };

    // Reset index if it exceeds max after resize or tab change
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    // Reset to first slide when changing tabs
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeTab]);

    // Auto-play: slide one by one every 5 seconds
    useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= maxIndex) {
                    return 0;
                }
                return prev + 1;
            });
        }, 5000);

        return () => clearInterval(autoPlayInterval);
    }, [maxIndex, resetKey]);

    return (
        <section id="properties" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-accent-green text-lg font-medium uppercase tracking-wider mb-2">
                        {t('hero.subtitle')}
                    </p>
                    <h2 className="text-4xl font-bold text-primary-green-dark relative inline-block">
                        {t('properties.title')}
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent-gold"></span>
                    </h2>
                </div>

                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all cursor-pointer border-2 ${activeTab === 'all'
                            ? 'bg-black/80 text-white'
                            : 'bg-white text-black hover:bg-gray-200 hover:text-black'
                            }`}
                    >
                        {t('properties.all')}
                    </button>
                    <button
                        onClick={() => setActiveTab('sale')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all cursor-pointer border-2 ${activeTab === 'sale'
                            ? 'bg-black/80 text-white'
                            : 'bg-white text-black hover:bg-gray-200 hover:text-black'
                            }`}
                    >
                        {t('hero.sale')}
                    </button>
                    <button
                        onClick={() => setActiveTab('rent')}
                        className={`px-8 py-3 rounded-full font-semibold transition-all cursor-pointer border-2 ${activeTab === 'rent'
                            ? 'bg-black/80 text-white'
                            : 'bg-white text-black hover:bg-gray-200 hover:text-black'
                            }`}
                    >
                        {t('hero.rent')}
                    </button>
                </div>

                {/* Carousel Container */}
                <div className="relative px-12 md:px-16">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-gray-700 shadow-lg flex items-center justify-center transition-all ${currentIndex === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary-green hover:text-gray-400 cursor-pointer'
                            }`}
                        aria-label="Previous properties"
                    >
                        <i className="fas fa-chevron-left text-sm md:text-base"></i>
                    </button>

                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                            }}
                        >
                            {filteredProperties.map((property) => (
                                <div
                                    key={property.id}
                                    className="flex-shrink-0 px-2 md:px-3 py-1"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-gray-700 shadow-lg flex items-center justify-center transition-all ${currentIndex >= maxIndex
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary-green hover:text-gray-400 cursor-pointer'
                            }`}
                        aria-label="Next properties"
                    >
                        <i className="fas fa-chevron-right text-sm md:text-base"></i>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-2 md:h-3 rounded-full transition-all ${currentIndex === index
                                ? 'bg-gray-500 w-6 md:w-8'
                                : 'bg-gray-300 hover:bg-gray-400 w-2 md:w-3'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* View More Properties Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/propiedades"
                        className="inline-block bg-gray-100 text-primary-green-dark font-bold py-4 px-10 rounded-full hover:bg-gray-200 duration-300 shadow-lg text-black transform transition-all duration-300 tracking-wide hover:-translate-y-0.5"
                    >
                        {t('properties.viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
                                    <Link
                                        href={`/propiedad/${property.id}`}
                                        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group block"
                                    >
                                        <div className="relative h-64 overflow-hidden shimmer-effect">
                                            <Image
                                                src={property.images?.[0] || property.image}
                                                alt={property.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                onLoad={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.parentElement?.classList.add('loaded');
                                                }}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/40 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                                                    {property.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-primary-green-dark mb-2 group-hover:text-accent-green transition-colors">
                                                {property.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 flex items-center">
                                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                                {property.location}
                                            </p>

                                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                                {property.bedrooms !== undefined && property.bedrooms > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <i className="fas fa-bed text-gray-500"></i>
                                                        {property.bedrooms}
                                                    </span>
                                                )}
                                                {property.bathrooms !== undefined && property.bathrooms > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <i className="fas fa-bath text-gray-500"></i>
                                                        {property.bathrooms}
                                                    </span>
                                                )}
                                                {property.area && (
                                                    <span className="flex items-center gap-1">
                                                        <i className="fas fa-ruler-combined text-gray-500"></i>
                                                        {property.area} m²
                                                    </span>
                                                )}
                                            </div>

                                            <div className="border-t pt-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-2xl font-bold text-accent-green">
                                                        {property.price.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {property.type === 'rent' ? t('properties.monthly') : t('properties.mxn')}
                                                    </p>
                                                </div>
                                                <span className="bg-primary-green text-white px-4 py-2 rounded-md group-hover:bg-accent-green transition-colors text-sm font-semibold">
                                                    {t('properties.viewMore')}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
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

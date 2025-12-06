'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { agents } from '../lib/agentData';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function Agents() {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);
    const [resetKey, setResetKey] = useState(0); // Key to reset auto-play timer

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1); // Mobile: 1 agent
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2); // Tablet: 2 agents
            } else {
                setItemsPerView(4); // Desktop: 4 agents
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, agents.length - itemsPerView);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        setResetKey((prev) => prev + 1); // Reset auto-play timer
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
        setResetKey((prev) => prev + 1); // Reset auto-play timer
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        setResetKey((prev) => prev + 1); // Reset auto-play timer
    };

    // Reset index if it exceeds max after resize
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    // Auto-play: slide one by one every 5 seconds
    useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            setCurrentIndex((prev) => {
                // If we're at the end, jump back to the beginning
                if (prev >= maxIndex) {
                    return 0;
                }
                // Otherwise, move to the next slide
                return prev + 1;
            });
        }, 5000); // 5 seconds

        // Cleanup interval on unmount
        return () => clearInterval(autoPlayInterval);
    }, [maxIndex, resetKey]); // Reset when resetKey changes

    return (
        <section id="agents" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-accent-green text-lg font-medium uppercase tracking-wider mb-2">
                        {t('agents.subtitle')}
                    </p>
                    <h2 className="text-4xl font-bold text-primary-green-dark relative inline-block">
                        {t('agents.meetOurAgents')}
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent-gold"></span>
                    </h2>
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
                        aria-label="Previous agents"
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
                            {agents.map((agent) => (
                                <div
                                    key={agent.id}
                                    className="flex-shrink-0 px-2 md:px-3 py-1"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                        <div className="relative h-64 md:h-80 overflow-hidden">
                                            <Link href={`/agente/${agent.id}`}>
                                                <Image
                                                    src={agent.image}
                                                    alt={agent.name}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                                                />
                                            </Link>
                                        </div>

                                        <div className="p-4 md:p-6 text-center">
                                            <h4 className="text-lg md:text-xl font-bold text-primary-green-dark mb-2 hover:text-accent-green transition-colors">
                                                <Link href={`/agente/${agent.id}`}>{agent.name}</Link>
                                            </h4>
                                            <span className="text-accent-green text-sm block mb-3 md:mb-4">
                                                {agent.role}
                                            </span>

                                            <div className="flex items-center justify-center gap-2">
                                                <i className="fab fa-whatsapp text-gray-500 text-lg md:text-xl"></i>
                                                <a
                                                    href={`tel:${agent.phone.replace(/\s/g, '')}`}
                                                    className="text-sm md:text-base text-primary-green font-semibold hover:text-accent-green transition-colors"
                                                >
                                                    {agent.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
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
                        aria-label="Next agents"
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
            </div>
        </section>
    );
}

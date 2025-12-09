'use client';

import Image from 'next/image';

import { useTranslation } from '../lib/i18n/useTranslation';

export default function About() {
    const { t } = useTranslation();
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded-lg overflow-hidden h-96 lg:h-full shimmer-effect">
                        <Image
                            src="/about-placeholder.jpg"
                            alt="About Us"
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                            onLoad={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.parentElement?.classList.add('loaded');
                            }}
                        />
                    </div>

                    <div>
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold text-primary-green-dark relative inline-block">
                                {t('about.title')}
                                <span className="absolute -bottom-3 left-0 w-20 h-1 bg-accent-gold"></span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p>
                                {t('about.description1')}
                            </p>
                            <p>
                                {t('about.description2')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

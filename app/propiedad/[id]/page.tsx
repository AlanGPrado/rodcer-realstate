'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Lightbox from '../../components/Lightbox';
import { getPropertyById, getRecentProperties } from '../../lib/propertyData';
import { useTranslation } from '../../lib/i18n/useTranslation';

const Map = dynamic(() => import('../../components/Map'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-500">Loading Map...</div>
});

export default function PropertyDetail() {
    const { t } = useTranslation();
    const params = useParams();
    const id = parseInt(params.id as string);
    const property = getPropertyById(id);
    const recentProperties = getRecentProperties(id, 3);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary-green mb-4">{t('propertyDetail.notFound')}</h1>
                    <Link href="/" className="text-accent-green hover:underline">
                        {t('agentDetail.returnHome')}
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${property.type === 'sale' ? 'bg-primary-green' : 'bg-secondary-green'
                                }`}>
                                {property.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-green-dark mb-2">
                            {property.code} {property.title}
                        </h1>
                        <p className="text-gray-600 text-lg flex items-center gap-2">
                            <i className="fas fa-map-marker-alt text-accent-green"></i>
                            {property.location}
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-4xl font-bold text-primary-green">
                            {property.price}
                            {property.priceFrequency && (
                                <span className="text-lg font-normal text-gray-600 ml-2">
                                    {property.priceFrequency}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-6 border-b border-gray-300 overflow-x-auto">
                        <a href="#description" className="pb-3 px-2 text-primary-green border-b-2 border-primary-green font-semibold whitespace-nowrap">
                            {t('propertyDetail.description')}
                        </a>
                        <a href="#details" className="pb-3 px-2 text-gray-600 hover:text-primary-green transition-colors whitespace-nowrap">
                            {t('propertyDetail.details')}
                        </a>
                        <a href="#gallery" className="pb-3 px-2 text-gray-600 hover:text-primary-green transition-colors whitespace-nowrap">
                            {t('propertyDetail.gallery')}
                        </a>
                        <a href="#map" className="pb-3 px-2 text-gray-600 hover:text-primary-green transition-colors whitespace-nowrap">
                            {t('propertyDetail.location')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Main Image */}
                            <div
                                className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl cursor-pointer group"
                                onClick={() => {
                                    setCurrentImageIndex(0);
                                    setLightboxOpen(true);
                                }}
                            >
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <i className="fas fa-expand-arrows-alt text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl drop-shadow-lg"></i>
                                </div>
                            </div>

                            {/* Gallery */}
                            <div id="gallery">
                                <h2 className="text-2xl font-bold text-primary-green-dark mb-4">
                                    {t('propertyDetail.gallery')}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.images?.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                                            onClick={() => {
                                                setCurrentImageIndex(index);
                                                setLightboxOpen(true);
                                            }}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${property.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-lg"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div id="description">
                                <h2 className="text-2xl font-bold text-primary-green-dark mb-4">
                                    {t('propertyDetail.aboutProperty')}
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>

                            {/* Location */}
                            <div id="map">
                                <h2 className="text-2xl font-bold text-primary-green-dark mb-4">
                                    {t('propertyDetail.location')}
                                </h2>
                                <div className="h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
                                    <Map
                                        location={property.location}
                                        coordinates={property.coordinates}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Property Details */}
                            <div id="details" className="bg-gray-50 rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4">
                                    {t('propertyDetail.details')}
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-semibold">{t('propertyDetail.code')}:</span>
                                        <span>{property.code}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-semibold">{t('propertyDetail.type')}:</span>
                                        <span>{property.propertyType}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-semibold">{t('propertyDetail.operation')}:</span>
                                        <span>{property.type === 'sale' ? t('hero.sale') : t('hero.rent')}</span>
                                    </div>
                                    {property.bedrooms && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-semibold">{t('propertyDetail.bedrooms')}:</span>
                                            <span>{property.bedrooms}</span>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-semibold">{t('propertyDetail.bathrooms')}:</span>
                                            <span>{property.bathrooms}</span>
                                        </div>
                                    )}
                                    {property.parking && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-semibold">{t('propertyDetail.parking')}:</span>
                                            <span>{property.parking}</span>
                                        </div>
                                    )}
                                    {property.constructionArea && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-semibold">{t('propertyDetail.constructionArea')}:</span>
                                            <span>{property.constructionArea} m²</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold text-primary-green-dark mb-4">
                                    {t('properties.amenities')}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {property.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-gray-700">
                                            <i className="fas fa-check text-accent-green"></i>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agent Info */}
                            <div className="bg-primary-green rounded-lg p-6 shadow-md text-white">
                                <h3 className="text-xl font-bold mb-4">{t('agentDetail.advisor')}</h3>

                                <div className="mb-6">
                                    <p className="font-semibold text-lg mb-3">{property.agent.name}</p>
                                    <div className="space-y-2">
                                        <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 hover:text-accent-light transition-colors">
                                            <i className="fas fa-phone-alt"></i>
                                            <span>{property.agent.phone}</span>
                                        </a>
                                        <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 hover:text-accent-light transition-colors">
                                            <i className="fas fa-envelope"></i>
                                            <span>{property.agent.email}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={t('contact.form.name')}
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                                        required
                                    />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder={t('contact.form.email')}
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder={t('contact.form.phone')}
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                                        required
                                    />
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={t('contact.form.message')}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full bg-accent-gold text-white py-2 px-4 rounded-md font-semibold hover:bg-accent-gold/90 transition-all"
                                    >
                                        {t('contact.form.send')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Properties */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary-green-dark mb-8">
                        {t('agentDetail.recentProperties')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.map((prop) => (
                            <Link
                                key={prop.id}
                                href={`/propiedad/${prop.id}`}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={prop.image}
                                        alt={prop.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${prop.type === 'sale' ? 'bg-primary-green' : 'bg-secondary-green'
                                            }`}>
                                            {prop.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 mb-2">
                                        {prop.code} {prop.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                                        <i className="fas fa-map-marker-alt text-accent-green"></i>
                                        {prop.location}
                                    </p>
                                    <p className="text-xl font-bold text-primary-green">
                                        {prop.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Lightbox
                images={property.images || [property.image]}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                initialIndex={currentImageIndex}
            />

            <Footer />
        </>
    );
}

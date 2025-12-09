'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { properties } from '../lib/propertyData';

import { useTranslation } from '../lib/i18n/useTranslation';

export default function PropertiesPage() {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        operation: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        minArea: '',
        maxArea: '',
        amenities: [] as string[],
    });

    const [showFilters, setShowFilters] = useState(false);

    const amenitiesList = [
        'Alumbrado público',
        'Pavimento',
        'Sala',
        'Cocina',
        'Área sala-comedor',
        'Terraza',
        'Lavadero',
        'Agua potable',
        'Electricidad',
        'Salón de TV',
        'Vestidor',
        'Cocina Americana',
        'Colegio',
        'Vigilancia',
        'Cava',
        'Lavandería',
        'Patio',
        'Jardín',
        'Internet',
        'Jacuzzi',
        'Aire Acondicionado',
        'Portón',
        'Portón eléctrico',
    ];

    const handleFilterChange = (key: string, value: string | string[]) => {
        setFilters({ ...filters, [key]: value });
    };

    const toggleAmenity = (amenity: string) => {
        const newAmenities = filters.amenities.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...filters.amenities, amenity];
        handleFilterChange('amenities', newAmenities);
    };

    const clearFilters = () => {
        setFilters({
            operation: '',
            propertyType: '',
            minPrice: '',
            maxPrice: '',
            bedrooms: '',
            bathrooms: '',
            minArea: '',
            maxArea: '',
            amenities: [],
        });
    };

    const filteredProperties = properties.filter(property => {
        if (filters.operation && property.type !== filters.operation) return false;
        if (filters.propertyType && property.propertyType !== filters.propertyType) return false;

        const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
        const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
        const propertyPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
        if (propertyPrice < minPrice || propertyPrice > maxPrice) return false;

        const minBedrooms = filters.bedrooms ? parseInt(filters.bedrooms) : 0;
        if (property.bedrooms !== undefined && property.bedrooms < minBedrooms) return false;

        const minBathrooms = filters.bathrooms ? parseInt(filters.bathrooms) : 0;
        if (property.bathrooms !== undefined && property.bathrooms < minBathrooms) return false;

        const minArea = filters.minArea ? parseInt(filters.minArea) : 0;
        const maxArea = filters.maxArea ? parseInt(filters.maxArea) : Infinity;
        if (property.area !== undefined && (property.area < minArea || property.area > maxArea)) return false;

        return true;
    });

    return (
        <main className="bg-gray-50 min-h-screen">
            <Header />

            {/* Page Header */}
            <section
                className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url(/properties-hero.jpg)' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white mt-10">{t('properties.title')}</h1>
                    <p className="text-lg opacity-90">{t('properties.subtitle')}</p>
                </div>
            </section>
            {/* Main Content */}
            <section className="py-12 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-primary-green-dark">{t('properties.filters')}</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-accent-green hover:text-primary-green transition-colors"
                                >
                                    {t('properties.clear')}
                                </button>
                            </div>

                            {/* Operation Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.operationType')}
                                </label>
                                <select
                                    value={filters.operation}
                                    onChange={(e) => handleFilterChange('operation', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent"
                                >
                                    <option value="">{t('properties.all')}</option>
                                    <option value="sale">{t('hero.sale')}</option>
                                    <option value="rent">{t('hero.rent')}</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.propertyType')}
                                </label>
                                <select
                                    value={filters.propertyType}
                                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent"
                                >
                                    <option value="">{t('properties.all')}</option>
                                    <option value="Casa">{t('hero.house')}</option>
                                    <option value="Departamento">{t('hero.apartment')}</option>
                                    <option value="Terreno">{t('hero.land')}</option>
                                    <option value="Local">{t('hero.commercial')}</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.priceRange')}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder={t('properties.min')}
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder={t('properties.max')}
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.bedrooms')}
                                </label>
                                <select
                                    value={filters.bedrooms}
                                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent"
                                >
                                    <option value="">{t('properties.any')}</option>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>

                            {/* Bathrooms */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.bathrooms')}
                                </label>
                                <select
                                    value={filters.bathrooms}
                                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent"
                                >
                                    <option value="">{t('properties.any')}</option>
                                    <option value="1">1+</option>
                                    <option value="2">2+</option>
                                    <option value="3">3+</option>
                                </select>
                            </div>

                            {/* Area Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('properties.area')}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder={t('properties.min')}
                                        value={filters.minArea}
                                        onChange={(e) => handleFilterChange('minArea', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder={t('properties.max')}
                                        value={filters.maxArea}
                                        onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-green focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
                                >
                                    <span>{t('properties.amenities')}</span>
                                    <i className={`fas fa-chevron-${showFilters ? 'up' : 'down'}`}></i>
                                </button>
                                {showFilters && (
                                    <div className="max-h-64 overflow-y-auto space-y-2 mt-3">
                                        {amenitiesList.map((amenity) => (
                                            <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.amenities.includes(amenity)}
                                                    onChange={() => toggleAmenity(amenity)}
                                                    className="w-4 h-4 text-accent-green focus:ring-accent-green border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{amenity}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Properties Grid */}
                    <div className="lg:w-3/4">
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {t('properties.showing')} <span className="font-semibold">{filteredProperties.length}</span> {t('properties.properties')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {filteredProperties.length === 0 && (
                            <div className="text-center py-12">
                                <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                                    {t('properties.noResults')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('properties.adjustFilters')}
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-accent-green text-white px-6 py-3 rounded-md hover:bg-primary-green transition-colors font-semibold"
                                >
                                    {t('properties.clearFilters')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

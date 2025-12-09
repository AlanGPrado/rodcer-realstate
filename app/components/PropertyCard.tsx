'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n/useTranslation';
import { Property } from '../lib/propertyData';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link
            href={`/propiedad/${property.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group block h-full flex flex-col"
        >
            <div className={`relative h-64 overflow-hidden shimmer-effect ${isLoaded ? 'loaded' : ''}`}>
                <Image
                    src={property.images?.[0] || property.image || '/property-placeholder.jpg'}
                    alt={property.title}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsLoaded(true)} // Stop shimmer even on error
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        {property.type === 'sale' ? t('hero.sale') : t('hero.rent')}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary-green-dark mb-2 group-hover:text-accent-green transition-colors line-clamp-1">
                    {property.title}
                </h3>
                <p className="text-gray-600 mb-4 flex items-center line-clamp-1">
                    <i className="fas fa-map-marker-alt text-red-600 mr-2 flex-shrink-0"></i>
                    <span className="truncate">{property.location}</span>
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 mt-auto">
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
    );
}

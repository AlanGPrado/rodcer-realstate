// Mock property data
export interface Property {
    id: number;
    code: string;
    title: string;
    location: string;
    price: string;
    priceFrequency?: string;
    type: 'sale' | 'rent';
    bedrooms?: number;
    bathrooms?: number;
    parking?: number;
    area?: number;
    constructionArea?: number;
    image: string;
    images?: string[];
    description: string;
    propertyType: string;
    features: string[];
    agent: {
        name: string;
        phone: string;
        email: string;
        image: string;
    };
    agentId?: number;
    coordinates?: [number, number];
}

export const properties: Property[] = [
    {
        id: 1,
        code: 'CV-001',
        title: 'Modern Family House',
        location: 'Downtown Area, City Center',
        price: '$450,000',
        type: 'sale',
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        area: 250,
        constructionArea: 200,
        propertyType: 'House',
        image: '/property-1.jpg',
        images: [
            '/property-1.jpg',
            '/property-2.jpg',
            '/property-3.jpg',
            '/property-4.jpg',
        ],
        description: 'Beautiful modern family house located in the heart of downtown. This property features spacious rooms, modern finishes, and a large backyard perfect for family gatherings. The house has been recently renovated with high-quality materials and includes central air conditioning, modern kitchen appliances, and a two-car garage.',
        features: [
            'Living Room',
            'Kitchen',
            'Dining Room',
            'Master Bedroom',
            'Garden',
            'Garage',
            'Air Conditioning',
            'Security System',
        ],
        agent: {
            name: 'John Smith',
            phone: '123 456 7890',
            email: 'john@rodcerstate.com',
            image: '/agent-1.jpg',
        },
        agentId: 1,
        coordinates: [22.2331, -97.8611], // Tampico Centro
    },
    {
        id: 2,
        code: 'CR-002',
        title: 'Luxury Apartment',
        location: 'City Center, Premium District',
        price: '$1,500',
        priceFrequency: 'Monthly',
        type: 'rent',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        area: 120,
        constructionArea: 110,
        propertyType: 'Apartment',
        image: '/property-2.jpg',
        images: [
            '/property-2.jpg',
        ],
        description: 'Luxurious apartment in premium district with stunning city views. Features modern amenities, high-end finishes, and access to building facilities including gym, pool, and 24/7 security. Perfect for professionals or small families looking for comfort and convenience in the city center.',
        features: [
            'Living Room',
            'Kitchen',
            'Balcony',
            'Air Conditioning',
            'Gym Access',
            'Pool Access',
            'Security 24/7',
            'Parking',
        ],
        agent: {
            name: 'Sarah Johnson',
            phone: '123 456 7891',
            email: 'sarah@rodcerstate.com',
            image: '/agent-2.jpg',
        },
        agentId: 2,
        coordinates: [22.2764, -97.8465], // Ciudad Madero Centro
    },
    {
        id: 3,
        code: 'CV-003',
        title: 'Spacious Villa',
        location: 'Suburban Area, Green Hills',
        price: '$680,000',
        type: 'sale',
        bedrooms: 4,
        bathrooms: 3,
        parking: 3,
        area: 350,
        constructionArea: 300,
        propertyType: 'Villa',
        image: '/property-3.jpg',
        images: [
            '/property-3.jpg',
        ],
        description: 'Magnificent villa in the exclusive Green Hills area. This stunning property offers luxury living with spacious rooms, high ceilings, and premium finishes throughout. The villa includes a private pool, landscaped gardens, and a separate guest house. Perfect for families seeking tranquility and elegance.',
        features: [
            'Living Room',
            'Kitchen',
            'Dining Room',
            'Master Suite',
            'Guest Rooms',
            'Pool',
            'Garden',
            'Guest House',
            'Garage',
            'Security System',
            'Air Conditioning',
        ],
        agent: {
            name: 'Michael Brown',
            phone: '123 456 7892',
            email: 'michael@rodcerstate.com',
            image: '/agent-3.jpg',
        },
        agentId: 3,
        coordinates: [22.3869, -97.9394], // Altamira Centro
    },
    {
        id: 4,
        code: 'CV-004',
        title: 'Contemporary Beach House',
        location: 'Coastal Area, Beachfront',
        price: '$850,000',
        type: 'sale',
        bedrooms: 5,
        bathrooms: 4,
        parking: 2,
        area: 400,
        constructionArea: 350,
        propertyType: 'House',
        image: '/property-4.jpg',
        images: [
            '/property-4.jpg',
        ],
        description: 'Stunning beachfront property with panoramic ocean views. This contemporary house features floor-to-ceiling windows, open-plan living spaces, and direct beach access. Includes a rooftop terrace, infinity pool, and state-of-the-art smart home technology. The perfect retreat for those seeking luxury coastal living.',
        features: [
            'Ocean View',
            'Beach Access',
            'Infinity Pool',
            'Rooftop Terrace',
            'Smart Home System',
            'Modern Kitchen',
            'Master Suite',
            'Guest Bedrooms',
            'Outdoor Shower',
            'BBQ Area',
            'Security System',
        ],
        agent: {
            name: 'Emily Davis',
            phone: '123 456 7893',
            email: 'emily@rodcerstate.com',
            image: '/agent-4.jpg',
        },
        agentId: 4,
        coordinates: [22.2189, -97.8292], // Playa Miramar
    },
    {
        id: 5,
        code: 'CR-005',
        title: 'Executive Penthouse',
        location: 'Financial District, Tower Heights',
        price: '$3,200',
        priceFrequency: 'Monthly',
        type: 'rent',
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
        area: 200,
        constructionArea: 180,
        propertyType: 'Apartment',
        image: '/property-5.jpg',
        images: [
            '/property-5.jpg',
        ],
        description: 'Exclusive penthouse in the heart of the financial district. This luxurious residence offers breathtaking city skyline views, premium finishes, and top-tier amenities. Features include a private elevator, wine cellar, and expansive terrace. Ideal for executives seeking sophisticated urban living.',
        features: [
            'Skyline Views',
            'Private Elevator',
            'Wine Cellar',
            'Terrace',
            'Gourmet Kitchen',
            'Master Suite',
            'Walk-in Closets',
            'Home Office',
            'Concierge Service',
            'Valet Parking',
            'Gym Access',
        ],
        agent: {
            name: 'David Wilson',
            phone: '123 456 7894',
            email: 'david@rodcerstate.com',
            image: '/agent-5.jpg',
        },
        agentId: 5,
        coordinates: [22.2450, -97.8550], // Zona Dorada
    },
    {
        id: 6,
        code: 'CR-006',
        title: 'Modern Downtown Condo',
        location: 'Downtown, Arts District',
        price: '$1,800',
        priceFrequency: 'Monthly',
        type: 'rent',
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        area: 140,
        constructionArea: 130,
        propertyType: 'Apartment',
        image: '/property-6.jpg',
        images: [
            '/property-6.jpg',
        ],
        description: 'Stylish condo in the vibrant Arts District. This modern unit features an open floor plan, designer finishes, and large windows with abundant natural light. Walking distance to galleries, restaurants, and entertainment venues. Perfect for young professionals and creatives seeking an urban lifestyle.',
        features: [
            'Open Floor Plan',
            'Modern Kitchen',
            'Hardwood Floors',
            'Large Windows',
            'In-Unit Laundry',
            'Balcony',
            'Building Gym',
            'Rooftop Lounge',
            'Bike Storage',
            'Pet Friendly',
        ],
        agent: {
            name: 'Lisa Anderson',
            phone: '123 456 7895',
            email: 'lisa@rodcerstate.com',
            image: '/agent-6.jpg',
        },
        agentId: 6,
        coordinates: [22.2300, -97.8500], // Centro Histórico
    },
    {
        id: 7,
        code: 'CV-007',
        title: 'Colonial Family Home',
        location: 'Historic District, Old Town',
        price: '$520,000',
        type: 'sale',
        bedrooms: 4,
        bathrooms: 3,
        parking: 2,
        area: 280,
        constructionArea: 240,
        propertyType: 'Casa',
        image: '/property-7.jpg',
        images: [
            '/property-7.jpg',
        ],
        description: 'Charming colonial-style home in the historic district. This beautifully preserved property features original architectural details, high ceilings, and a central courtyard. Recently updated with modern amenities while maintaining its historic character. Perfect for families who appreciate traditional elegance.',
        features: [
            'Central Courtyard',
            'High Ceilings',
            'Original Tile Work',
            'Modern Kitchen',
            'Master Suite',
            'Guest Bedrooms',
            'Covered Terrace',
            'Storage Room',
            'Security System',
            'Air Conditioning',
        ],
        agent: {
            name: 'John Smith',
            phone: '123 456 7890',
            email: 'john@rodcerstate.com',
            image: '/agent-1.jpg',
        },
        agentId: 1,
        coordinates: [22.2350, -97.8480],
    },
    {
        id: 8,
        code: 'CR-008',
        title: 'Waterfront Luxury Penthouse',
        location: 'Marina District, Waterfront',
        price: '$4,500',
        priceFrequency: 'Monthly',
        type: 'rent',
        bedrooms: 4,
        bathrooms: 4,
        parking: 3,
        area: 280,
        constructionArea: 260,
        propertyType: 'Departamento',
        image: '/property-8.jpg',
        images: [
            '/property-8.jpg',
        ],
        description: 'Spectacular waterfront penthouse with panoramic marina views. This ultra-luxury residence features floor-to-ceiling windows, designer finishes, and a private rooftop terrace with infinity pool. Includes smart home automation, wine cellar, and access to exclusive marina club amenities.',
        features: [
            'Marina Views',
            'Private Rooftop',
            'Infinity Pool',
            'Wine Cellar',
            'Smart Home System',
            'Gourmet Kitchen',
            'Master Suite',
            'Walk-in Closets',
            'Home Theater',
            'Marina Club Access',
            'Concierge Service',
            'Valet Parking',
        ],
        agent: {
            name: 'Sarah Johnson',
            phone: '123 456 7891',
            email: 'sarah@rodcerstate.com',
            image: '/agent-2.jpg',
        },
        agentId: 2,
        coordinates: [22.2200, -97.8350],
    },
    {
        id: 9,
        code: 'CV-009',
        title: 'Prime Commercial Space',
        location: 'Business District, Main Avenue',
        price: '$890,000',
        type: 'sale',
        bedrooms: 0,
        bathrooms: 4,
        parking: 8,
        area: 450,
        constructionArea: 420,
        propertyType: 'Local',
        image: '/property-9.jpg',
        images: [
            '/property-9.jpg',
        ],
        description: 'Premium commercial property in the heart of the business district. This modern building offers flexible floor plans, high-speed connectivity, and ample parking. Ideal for corporate offices, medical facilities, or retail establishments. Excellent visibility and foot traffic on Main Avenue.',
        features: [
            'Prime Location',
            'Flexible Floor Plan',
            'High-Speed Internet',
            'Conference Rooms',
            'Reception Area',
            'Kitchen Facilities',
            'Multiple Restrooms',
            'Elevator Access',
            'Security System',
            'Backup Generator',
            'Ample Parking',
            'Signage Opportunities',
        ],
        agent: {
            name: 'Michael Brown',
            phone: '123 456 7892',
            email: 'michael@rodcerstate.com',
            image: '/agent-3.jpg',
        },
        agentId: 3,
        coordinates: [22.2400, -97.8520],
    },
];

export function getPropertyById(id: number): Property | undefined {
    return properties.find(p => p.id === id);
}

export function getPropertyByCode(code: string): Property | undefined {
    return properties.find(p => p.code === code);
}

export function getPropertiesByAgentId(agentId: number): Property[] {
    return properties.filter(p => p.agentId === agentId);
}

export function getRecentProperties(excludeId?: number, limit: number = 3): Property[] {
    return properties
        .filter(p => p.id !== excludeId)
        .slice(0, limit);
}

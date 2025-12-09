'use client';

interface MapProps {
    location: string;
    coordinates?: [number, number]; // [lat, lng]
}

export default function Map({ location, coordinates }: MapProps) {
    // Default coordinates (Tampico, Mexico) if none provided
    const defaultPosition: [number, number] = [22.2331, -97.8611];
    const position = coordinates || defaultPosition;

    // Create Google Maps embed URL (no API key required)
    const mapUrl = `https://maps.google.com/maps?q=${position[0]},${position[1]}&hl=es&z=14&output=embed`;

    return (
        <div className="h-full w-full rounded-lg overflow-hidden z-0 relative">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={mapUrl}
                title={location}
            />
        </div>
    );
}

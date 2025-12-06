'use client';

interface MapProps {
    location: string;
    coordinates?: [number, number]; // [lat, lng]
}

export default function Map({ location, coordinates }: MapProps) {
    // Default coordinates (Tampico, Mexico) if none provided
    const defaultPosition: [number, number] = [22.2331, -97.8611];
    const position = coordinates || defaultPosition;

    // Create OpenStreetMap embed URL (no API key required)
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${position[1] - 0.01},${position[0] - 0.01},${position[1] + 0.01},${position[0] + 0.01}&layer=mapnik&marker=${position[0]},${position[1]}`;

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

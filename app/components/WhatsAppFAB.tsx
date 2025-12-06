'use client';

export default function WhatsAppFAB() {
    const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
    const message = 'Hello! I would like to inquire about a property.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Contact us on WhatsApp"
        >
            <i className="fab fa-whatsapp text-white text-3xl group-hover:scale-110 transition-transform"></i>

            {/* Pulse animation - 3 second interval */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-slow"></span>
        </a>
    );
}

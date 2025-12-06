'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface LightboxProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export default function Lightbox({ images, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const hasDragged = useRef(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialIndex]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [images.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [images.length]);

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoom((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoom((prev) => Math.max(prev - 0.5, 1));
        if (zoom <= 1.5) setPosition({ x: 0, y: 0 });
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    }, [isOpen, onClose, handlePrev, handleNext]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleMouseDown = (e: React.MouseEvent) => {
        hasDragged.current = false;
        if (zoom > 1) {
            setIsDragging(true);
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            hasDragged.current = true;
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleBackdropClick = () => {
        if (!hasDragged.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/75 flex items-center justify-center backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-4 z-50">
                <div className="flex gap-2 bg-black/50 rounded-lg p-1">
                    <button
                        onClick={handleZoomOut}
                        className="p-2 text-white hover:text-accent-gold transition-colors"
                        title="Zoom Out"
                    >
                        <i className="fas fa-search-minus text-xl"></i>
                    </button>
                    <button
                        onClick={handleZoomIn}
                        className="p-2 text-white hover:text-accent-gold transition-colors"
                        title="Zoom In"
                    >
                        <i className="fas fa-search-plus text-xl"></i>
                    </button>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="p-2 text-white hover:text-red-500 transition-colors bg-black/50 rounded-lg"
                    title="Close"
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>
            </div>

            {/* Navigation */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-accent-gold transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
            >
                <i className="fas fa-chevron-left text-3xl"></i>
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-accent-gold transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
            >
                <i className="fas fa-chevron-right text-3xl"></i>
            </button>

            {/* Image Container */}
            <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="relative w-full h-full transition-transform duration-200 ease-out"
                    style={{
                        transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                        cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                        draggable={false}
                    />
                </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}

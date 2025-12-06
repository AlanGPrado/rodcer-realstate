'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import es from './translations/es.json';
import en from './translations/en.json';

type Language = 'es' | 'en';
type Translations = typeof es;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
    es,
    en,
};

function detectBrowserLanguage(): Language {
    if (typeof window === 'undefined') return 'es';

    const browserLang = navigator.language || navigator.languages?.[0] || 'es';
    const langCode = browserLang.split('-')[0].toLowerCase();

    return langCode === 'en' ? 'en' : 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        // Detect browser language on mount
        const detectedLang = detectBrowserLanguage();
        setLanguage(detectedLang);
    }, []);

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

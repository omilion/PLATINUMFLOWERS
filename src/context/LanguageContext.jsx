import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Intentar leer de localStorage si existe previamente
    const [language, setLanguage] = useState(() => {
        const localData = localStorage.getItem('platinium_lang');
        return localData ? localData : 'es'; // default Spanish
    });

    useEffect(() => {
        localStorage.setItem('platinium_lang', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

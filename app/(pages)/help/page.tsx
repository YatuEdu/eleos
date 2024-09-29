'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EleosHelpText from '@/lib/client/model/EleosHelpText';
import { HelpTextObject } from '@/lib/client/model/EleosMisc';
import { useElos } from '@/lib/providers/EleosAppProvider';

const HelpPage: React.FC = () => {
    const { ref, language, setLanguage } = useElos() ?? {};

    if (!ref || !ref.current) {
        throw Error('Eleos is not initialized');
    }

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const lang = searchParams.get('lang');

    const [helpTextObject, setHelpTextObject] = useState<HelpTextObject | undefined>(undefined);

    const setHelperText = (langChanged: string) => {
        if (!id) return;

        const helipId = Number(id);
        const language = Number(langChanged);
        const helpTextObjectIn = EleosHelpText.getHelpTextAll(helipId, language);

        if (!helpTextObjectIn) {
            throw Error('HelpPage: helpTextObject is missing');
        }

        setHelpTextObject(helpTextObjectIn);
    };

    useEffect(() => {
        if (!id || !lang || !setLanguage) {
            return;
        }

        setHelperText(lang);
        setLanguage(Number(lang));
    }, [id, lang, setLanguage]);

    useEffect(() => {
        setHelperText(language + '');
    }, [language]);

    return (
        <div className="bg-sky-500 text-white overflow-y-auto h-full p-4 rounded-md text-lg">
            {helpTextObject ? (
                <div className="mb-4">
                    <h2 className="text-xl font-bold">{helpTextObject.h2Subject}</h2>
                    <div dangerouslySetInnerHTML={{ __html: helpTextObject.helpTextBody }} />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default HelpPage;

import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import React , { useEffect, useState }                
                from 'react';

interface HelpTextProps {
    helpTextEnIds: number[];
}

const EleosHelpPane: React.FC<HelpTextProps> = ({ helpTextEnIds }) => {
    const {ref, language} = useElos() ?? {};
    if (!ref || !ref.current) {
      throw Error('Eleos is not initialized');
    }
    const [helpTextObjects, setHelpTextObjects] = useState(ref.current.getHelpText(helpTextEnIds))

    useEffect(() => {
        if (!ref || !ref.current) {
            throw Error('Eleos is not initialized');
          }
        setHelpTextObjects(ref.current.getHelpText(helpTextEnIds))
    }, [language])

    return (
        <div className="bg-sky-500 text-white overflow-y-auto h-full p-4 rounded-md text-lg">
            {helpTextObjects.map((helpTextObject, index) => {    
                 return (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-bold">{helpTextObject.h2Subject}</h2>
                        <p>{helpTextObject.helpTextBody}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default EleosHelpPane;

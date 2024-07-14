import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } from '@/lib/providers/WizardProvider';
import React , { useEffect, useState }                
                from 'react';

interface HelpTextProps {
    helpTextEnIds: number[];
}

const EleosHelpPane: React.FC = () => {
    const {ref, language} = useElos() ?? {};
    if (!ref || !ref.current) {
      throw Error('Eleos is not initialized');
    }
    const {currentHelpTextIds} = useWizard()
    const [helpTextObjects, setHelpTextObjects] = useState(ref.current.getHelpText(currentHelpTextIds))

    const setHelperText = () => {
        if (!ref || !ref.current) {
            throw Error('Eleos is not initialized');
        }
        if (currentHelpTextIds.length > 0) {
            setHelpTextObjects(ref.current.getHelpText(currentHelpTextIds))
        } 
    }

    useEffect(() => {
        setHelperText()
    }, [currentHelpTextIds])

    useEffect(() => {
       setHelperText()
    }, [language])

    return (
        <div className="bg-sky-500 text-white overflow-y-auto h-full p-4 rounded-md text-lg">
            {helpTextObjects.map((helpTextObject, index) => {    
                 return (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-bold">{helpTextObject.h2Subject}</h2>
                        <div dangerouslySetInnerHTML={{ __html: helpTextObject.helpTextBody }} />
                    </div>
                );
            })}
        </div>
    );
};

export default EleosHelpPane;

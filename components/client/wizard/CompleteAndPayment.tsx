import React 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';

const CompleteAndPayment: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }
    const { setStep } = useWizard();

    const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        // go back to the previous step
        const step = ref.current.prevStep()
        step && setStep(step)
    };

    const onNext = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }


        // go to the next step
        const step = ref.current.nextStep()
        setStep(step)
    };

    return (
        <div>
            <div>
                <button>
                    Becoming a member and get free updates within a year. $200
                </button>
                <button>
                    One time PDF files: $250
                </button>
            </div>
            <div className="flex justify-between mt-4">
                <EleosButton
                        disabled={false}
                        text=" < Back"
                        onClick={onPrev}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue"
                    />
                    <EleosButton
                        disabled={true}
                        text="Save and Continue >"
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit"
                        tipEnabled="Click to save and continue"
                    />
            </div>
    </div>
    );
};

export default CompleteAndPayment;
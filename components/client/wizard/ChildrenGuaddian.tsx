import React, { useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import AddPersonModal 
                from '../functional/dialog/AddPersonModal';
import EleosPerson from '@/lib/client/model/EleosPerson';
import EleosItemsList 
                from '../functional/EleosNameList'; 
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import EleosLabel from '../atoms/EleosLabel';
import EleosGuardian from '@/lib/client/model/EleosGuardian';
import { EleosHelpTips } from '../functional/EleosHelpTips';
import { HelpTextId } from '@/lib/client/model/EleosMisc';
import { EleosRole } from '@/lib/client/model/EleosDataTypes';

const ChildrenGuardian: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.minors || !ref.current.minors.length)  {
        throw Error('Eleos is not initialized')  
    }
   
    const {minors} = ref.current;
    const { setStep } = useWizard();
    const [valid, setValid] = useState(ref.current.guardians.length > 0);
    const [guardians, setGuardians] = useState(ref.current.guardians.sort((a, b) => a.order - b.order));
    const [buttonText, setButtonText] = useState(ref.current.guardians.length === 0 ? 
        'Add Guardian' : ref.current.guardians.length === 1 ? 'Add an Alternative Guardian 1' : 'Add an Alternative Guardian 2'); 
    const [existingPeople, setExistingPeople] = useState(ref.current.potentialGuardians)

    /**
     * Submit the form and goes to the seconds page
     */
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

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // go to the next step
        const result = ref.current.addGuardians(guardians);
        if (!result.succeeded) {
            alert(result.error);
            return
        }
        
        // update existing potential guadians
        setExistingPeople([...ref.current.potentialGuardians])

        // go to the next step
        const step = ref.current.nextStep()
        setStep(step)
    };

    const onAddGaudian = (person: EleosPerson) => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

        let newGuardian = null
        if (person instanceof EleosGuardian) {
            newGuardian = person as EleosGuardian
        } else {
            throw new Error('Not a guardian object')
        }

        /*
        if (ref.current.checkPersonExists(newGuardian)) {
            alert('The added guardian shares the same name with someone else. You can append sr or jr to the name is the first name and last name are the same')
            return;
        }
        */

        const newGuardians = [...guardians, newGuardian];
        const result = setGuardians(newGuardians)

        setButtonText(newGuardians.length === 1 ? 'Add Alternate Guardian 1' : 'Add Alternate Guardian 2');
        setValid(newGuardians.length > 0);
    }

    const onDeleteGuardian = (index: number) => {
        const newGuardians = guardians.filter((_, i) => i !== index);
        setGuardians(newGuardians);
    }

    return (
        <>
        <div className="grid grid-cols-12 gap-1">
            <div className="col-span-7 border border-gray-600 rounded-md shadow-md">
                {/* List of all guadians */}
                {guardians.length > 0 && (
                    <div>
                        <EleosLabel text="List of gaurdians" />
                        <EleosItemsList 
                            entities={guardians} 
                            onDelete={onDeleteGuardian} />
                    </div>
                )}
                {/* Add your controls here */}
                {guardians.length < 3 && (
                    <>
                    <AddPersonModal
                        buttonText={buttonText}
                        role={EleosRole.child_guardian}
                        needEmail={true}
                        needDob={false}
                        existingPeople={existingPeople}
                        order={guardians.length + 1}
                        onSave={onAddGaudian}
                    />
                    <EleosHelpTips helpTextEnId={HelpTextId.Guardians} />
                    </>
 
                )}
            </div>
            <div className='col-span-5'>
                <EleosLabel text="List of minor children" />
                <EleosItemsList entities={minors} />
            </div>
        </div>
        <div className="flex justify-between mt-4">
             <EleosButton
                    type='wizard'
                    disabled={false}
                    text=" < Back"
                    onClick={onPrev}
                    tipDisable="Enter all the required info and then submit"
                    tipEnabled="Click to save and continue"
                />
                <EleosButton
                    type='wizard'
                    disabled={!valid}
                    text="Save and Continue >"
                    onClick={onNext}
                    tipDisable="Enter all the required info and then submit"
                    tipEnabled="Click to save and continue"
                />
        </div>
        </>
    );
};

export default ChildrenGuardian;
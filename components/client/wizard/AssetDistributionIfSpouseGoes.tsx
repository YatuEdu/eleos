import React, { useState } 
                from 'react';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import Eleos from '@/lib/client/model/Eleos';
import { EleosAssetType } from '@/lib/client/model/EleosAssetType';
import EleosPerson from '@/lib/client/model/EleosPerson';

type Heir = string;

const possibleHeirs: Heir[] = ['Child 1', 'Child 2', 'Relative 1', 'Relative 2'];

const AssetDistributionIfSpouseGoes: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || 
        !ref.current.spouse || !ref.current.children.length || !ref.current.assets)  {
        throw Error('Eleos is not initialized for this page')  
    }
    const {setStep} = useWizard()
    const [valid, setValid] = useState(true)
    const [distribution, setDistribution] = useState<string>('');
    const [heirs, setHeirs] = useState<EleosPerson[]>(ref.current.children)
    const [showAddHeirs, setShowAddHeirs] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(100);

    const handleDistributionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDistribution(value);
        setShowAddHeirs(value === 'otherHeirs');
    };

    const addHeir = (heir: Heir) => {
        alert('add heir: tbd')
    }

    const isCommunityProperty = ref.current.principal.residenceState.isCommSate
   
    const asset = ref.current.assetsSurvidedBySpouse
    if (!asset.length) {
        throw Error('Real estate asset is not found')
    }

    const title = `If ${ref.current.spouse.display} deseases and is survived by ${ref.current.principal.display}, 
    how is ${ref.current.spouse.display}'s portion of asset [${asset[0].name}] distributed?`
   

     /**
     * Submit the form and goes to the seconds page
     */
     const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
        // go back to the previous step
        const step = ref.current.prevStep()
        setStep(step)
    }
       
    const onNext = () => {  
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }

         // move to the next step
         const step = ref.current.nextStep()
         setStep(step)
    }

    return (
        <div>
            <h2>{title}</h2>
            <label>
                <input
                    type="radio"
                    value="allToWife"
                    checked={distribution === 'allToWife'}
                    onChange={handleDistributionChange}
                />
                {`${ref.current.spouse.display}'s portion goes entirely to ${ref.current.principal.display}`}
            </label>
            <label>
                <input
                    type="radio"
                    value="otherHeirs"
                    checked={distribution === 'otherHeirs'}
                    onChange={handleDistributionChange}
                />
                {`${ref.current.spouse.display}'s portion goes to other heirs`}
            </label>

            {showAddHeirs && (
                <div>
                    <h3>Select heirs to add:</h3>
                    {heirs.length > 0 && (
                        <div>
                            <h4>{`Distribution percentage over husbands share of ${asset[0].name}: `}</h4>
                            {isCommunityProperty && 
                            <input type="text" className='text-black' value={'50%'} readOnly />
                            }
                            {!isCommunityProperty && 
                            <input type="text" className='text-red' value={'50%'} />
                            }
                            <ul>
                                {heirs.map((heir, index) => (
                                    <li key={index}>
                                        {heir.display + '%'}
                                        <input type="text" className='text-black' value={25} /> 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                   {percentage < 100 &&  (
                        <button onClick={() => addHeir('new person')}>
                            + new person as heir
                        </button>
                    )}
                  
                  
                </div>
            )}
       
         <EleosWizardButtonLayout leftChild={
            <EleosButton
                type='wizard'
                className="mt-2"
                disabled={false}
                text=" < Back" 
                onClick={onPrev}
                tipDisable="Enter all the required info and then submit" 
                tipEnabled="Click to save and continue" />
        } rightChild={
            <EleosButton
                type='wizard'
                className="mt-2"
                disabled={!valid}
                text="Save and Continue >" 
                onClick={onNext}
                tipDisable="Enter all the required info and then submit" 
                tipEnabled="Click to save and continue" />
        } />
         </div>
    );
};

export default AssetDistributionIfSpouseGoes;

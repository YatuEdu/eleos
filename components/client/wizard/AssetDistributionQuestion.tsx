import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import React, { useEffect, useState } 
                from 'react';
import EleosButton from '../atoms/EleosButton';
import { useWizard } from '@/lib/providers/WizardProvider';
import { createTheme } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import RadioButtonGroup from '../atoms/EleosRadioGroup';

const theme = createTheme({
    components: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: 'white', // default non-checked color
            '&.Mui-checked': {
              color: 'red', // checked color
            }
          }
        }
      }
    }
  });
const RADIO_GROUP_TITLE = 'Asset Distribution Question';

const AssetDistributionQuestion: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const {ref} = useElos() ?? {}
    const {setStep} = useWizard() 
    const [distMethod, setDistMethod] = useState('');

    if (!ref || !ref.current)  {
        throw Error('Eleos is not initialized')  
    }

    const onlyChild = ref.current.children.length === 1 ? ref.current.children[0].firstName : ''

    useEffect(() => {   
       console.log('distMethod', distMethod)
    }, [distMethod])

    const distOptions0 = [
        { value: 'CHILD_ALL', label: `Distribute all your assets to "${onlyChild}"` },
        { value: 'CHILD_OTHER', label: `Distribute all your assets to "${onlyChild}" and other heirs` },
    ];

    const distOptions1 = [
        { value: 'CHILDREN_EVEN', label: 'Distribute all your assets evenly among your children' },
        { value: 'CHILDREN_UNEVEN', label: 'Distribute all your assets unevenly among your children' },
    ];
    const distOptions2 = [
        { value: 'OTHER_EVEN', label: 'Distribute your assets evenly among friends or relatives' },
        { value: 'OTHER_UNEVEN', label: 'Distribute your assets unevenly among friends or relatives' }
    ];

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission here
    };

    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const onPrev = () => {
        if (!ref || !ref.current)  {
            throw Error('Eleos is not initialized')  
        }
       
        const step = ref.current.prevStep()
        step && setStep(step)
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
            <h1>Asset Distribution Question</h1>
            {ref.current.children.length === 1 && (
                <div style={{ margin: 20 }}>
                    <RadioButtonGroup
                        title={RADIO_GROUP_TITLE}
                        options={distOptions0}
                        value=''
                        onChange={setDistMethod}
                    />
                </div>
            )}
            {ref.current.children.length === 0 && (
                <div style={{ margin: 20 }}>
                    <RadioButtonGroup
                        title={RADIO_GROUP_TITLE}
                        options={distOptions2}
                        value=''
                        onChange={setDistMethod}
                    />
                </div>
            )}
            {ref.current.children.length > 1 && (
          
                <div style={{ margin: 20 }}>
                    <RadioButtonGroup
                        title={RADIO_GROUP_TITLE}
                        options={distOptions1}
                        value=''
                        onChange={setDistMethod}
                    />
                </div>
          
            )}

            <div className="grid grid-cols-12 gap-1">
                <div className="col-span-7 flex justify-between">
                    <EleosButton
                        className="mr-1 mt-2"
                        disabled={false}
                        text=" < Back" 
                        onClick={onPrev}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                    <EleosButton
                        disabled={distMethod === ''}
                        className="mt-2"
                        text="Save and Continue >" 
                        onClick={onNext}
                        tipDisable="Enter all the required info and then submit" 
                        tipEnabled="Click to save and continue" />
                </div>
        </div>
        </div>
    );
};

export default AssetDistributionQuestion;
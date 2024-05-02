import React, { useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import Checkbox 
                from '@mui/material/Checkbox';
import FormControlLabel 
                from '@mui/material/FormControlLabel';
import EleosLabel 
                from '../atoms/EleosLabel';
import EleosNamesList 
                from '../functional/EleosNameList';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import AddPersonModal
                from '../functional/dialog/AddPersonModal';
import EleosChild 
                from '@/lib/client/model/EleosChild';
import { IntegerConst } 
                from '@/lib/common/constant/IntegerConst';
import { EleosHelpTips } 
                from '../functional/EleosHelpTips';
import { HelpTextId } 
                from '@/lib/client/model/EleosMisc';
import ConfirmationDialog 
                from '../functional/dialog/ConfirmationDialog';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';


const AddChildren: React.FC = () => {
    const {ref} = useElos() ?? {};
    const {children} = ref && ref.current ? ref.current : {children: null};
    const hasChildrenInit = !!children && children.length > 0
    const [hasChildren, setHasChildren] = useState(hasChildrenInit);
    const [childrenList, setChildrenList] = useState(children ? children : []); 
    const [valid, setValid] = useState(true)
    const {setStep} = useWizard()
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleHasChildren = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasChildren(event.target.checked);
        if (!event.target.checked) {
            setChildrenList([])
            setValid(true)
        } else {
            setValid(childrenList.length > 0)
        }
    }

    const onAddChild = (firstName: string, midName: string, lastName: string, suffix: string, birthYear?: string) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }

        if (!birthYear) {
            alert('Please enter the birth year')
            return;
        }

        const birthYearInt = parseInt(birthYear)

        // make sure that the birth year is valid
        const currentYear = new Date().getFullYear()
        if (currentYear - birthYearInt < 0 || currentYear - birthYearInt > IntegerConst.MAX_AGE) {
            alert('Invalid birth year')
            return;
        }

        // make sure the child has a unique name
        const newChild = new EleosChild(firstName,  midName, lastName, suffix, birthYearInt);
        if (ref.current.checkPersonExists(newChild)) {
            alert('The child share the same name with someone else. You can append sr or jr to the name is the first name and last name are the same')
            return;
        }

        
        if (childrenList.find(child => EleosPerson.equealTo(child, newChild)) !== undefined) {
            console.log(childrenList)
            alert('This child already exists')
            return;
        }
        setChildrenList([...childrenList, newChild])
        setValid(true)
     }

     const handleConfirmDeletion = () => {
        console.log('Action confirmed!');
        setOpenConfirmationDialog(false);
      };
    
      const handleCancelDeletion = () => {
        console.log('Action canceled!');
        setOpenConfirmationDialog(false);
      };

     const onDeleteName = (index: number) => {
        setOpenConfirmationDialog(true);
     }

    /**
     * Submit the form and goes to the seconds page
     */
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

        if (!valid) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // go to the next step
        if (!hasChildren) {
            ref.current.resetChildren()
        } else {
            ref.current.addChildren(childrenList)
        }    
         
        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl">Add your children as heirs</h1>
            </div>
                <div className="flex items-left ml-4">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasChildren}
                                onChange={handleHasChildren}
                                name="checkedB"
                                className={`
                                    text-yellow-500
                                    ${hasChildren ? 'bg-gray-200 rounded-md' : ''}
                                    hover:bg-gray-300
                                `}
                            />
                        }
                        label="Do you have children?" 
                    />
                    {hasChildren && (
                        <>
                        <AddPersonModal 
                            buttonText={childrenList.length ? 'Add another child' : 'Add a child'}
                            needDob={true} 
                            onSave={onAddChild} />
                    
                        </>
                    )}
                </div>
            <div className="mt-4">
                {hasChildren && (
                <div className='ml-2 mr-2'>
                    {childrenList.length > 0 && <EleosLabel text="List of children" />}
                    <EleosNamesList people={childrenList} onDelete={onDeleteName} />
                    <ConfirmationDialog
                        open={openConfirmationDialog}
                        title="Are you sure you want remove this child?"
                        message="Are you sure you want to do this?"
                        onConfirm={handleConfirmDeletion}
                        onCancel={handleCancelDeletion}
                    />
                </div>
                )}
            </div>
            <EleosWizardButtonLayout leftChild={
                <EleosButton
                     className="mr-1 mt-2"
                     disabled={false}
                     text=" < Back" 
                     onClick={onPrev}
                     tipDisable="Enter all the required info and then submit" 
                     tipEnabled="Click to save and continue" />
            } rightChild={
                <EleosButton
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

export default AddChildren;
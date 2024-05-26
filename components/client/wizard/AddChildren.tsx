import React, { useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';

import EleosLabel 
                from '../atoms/EleosLabel';
import EleosItemsList 
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
import RadioButtonGroup from 
                '../atoms/EleosRadioGroup';
import EleosChildrenStatus, { EleosChildrenStatusValue } 
                from '@/lib/client/model/EleosChildrenStatus';
import { EleosRelationshipType } from '@/lib/client/model/EleosRelationshipType';
import EleosRole, { EleosRoleId } from '@/lib/client/model/EleosRole';
import ChildrenTable from '../functional/ChildrenTable';


const AddChildren: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
        throw Error('Eleos is not initialized')  
    }

    const childrenExisting = ref.current.children as EleosChild[]
    const hasChildrenInit = !!childrenExisting && childrenExisting.length > 0
    const [childrenStatus, setChildrenStatus] = useState(ref.current.childrenStatus);
    const [childrenList, setChildrenList] = useState(childrenExisting ? [...childrenExisting] : []); 
    const [valid, setValid] = useState(ref.current.childrenStatus === EleosChildrenStatusValue.hasNoChildren || hasChildrenInit)
    const {setStep} = useWizard()
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const title = ref.current.title
    const childrenOptions = EleosChildrenStatus.childrenStatusLabeledValues(title)

    const onAddChild = (child: EleosRole) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }

        let newChild = null
        if (child instanceof EleosChild) {
            newChild = child as EleosChild
        } else {
            throw new Error('Not a child object')
        }

        // make sure that the birth year is valid
        const currentYear = new Date().getFullYear()
        if (currentYear - newChild.birthYear < 0 || currentYear - newChild.birthYear > IntegerConst.MAX_AGE) {
            alert('Invalid birth year')
            return;
        }

        // check if the child already exists
        if (ref.current.checkPersonExists(newChild.display)) {
            alert(`The person with the same name [${newChild.display}] exists.  Please enter a different name.`)
            return;
        }

        if (childrenList.find(child => child.display === newChild.display) !== undefined) {
            console.log(childrenList)
            alert('This child already exists')
            return;
        }
        // before child is formally added to Elso, set the childId toa negative number
        newChild.childId = (childrenList.length + 1) * -1
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

        if (!valid || !childrenStatus) {
            throw Error('Invalid form: IMPOSSIBLE')  
        }

        // go to the next step
        if (childrenStatus === EleosChildrenStatusValue.hasNoChildren) {
            ref.current.resetChildren()
        } else if (!hasChildrenInit) {
            // first time adding children
            const result = ref.current.addChildren(childrenList)
            if (!result.succeeded) {
                alert(result.error)
                return
            }
            ref.current.childrenStatus = childrenStatus
        } else {
            // update the children list (either add or update children)
            const result = ref.current.updateChildren(childrenList)
            if (!result.succeeded) {
                alert(result.error)
                return
            }
        }  
         
        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    const handleHasChildren = (status: string) => {
        // will not allow to change children status if there are children
        if (hasChildrenInit) {
            if (status !== EleosChildrenStatusValue.hasChildren) {
                alert('You cannot change the children status if there are children')
                setChildrenStatus(EleosChildrenStatusValue.hasChildren)
                return
            }
        }

        const hasChildren = status === EleosChildrenStatusValue.hasChildren
        setChildrenStatus(status as EleosChildrenStatusValue)
        if (!hasChildren) {
            setChildrenList([])
            setValid(true)
        } else {
            setValid(childrenList.length > 0)
        }
    }

    const childUpdated = (childUpdated: EleosChild) => {
        const childrenUodated = childrenList.map(c => {
            if (c.childId === childUpdated.childId) {
                //console.log('childUpdated', childUpdated)
                return childUpdated
            }
            return c
        })
        setChildrenList(childrenUodated)
    }

    return (
        <div>
            <div className="mb-8 ml-4">
                <h1 className="text-2xl">Add all children</h1>
            </div>
            <div style={{ margin: 20 }}>
                <RadioButtonGroup
                    title=''
                    options={childrenOptions}
                    disabledOptions={hasChildrenInit ? [EleosChildrenStatusValue.hasNoChildren] : []}
                    value={childrenStatus ? childrenStatus : ''}
                    onChange={handleHasChildren}
                    direction='row'
                />
            </div>
            <div className="mt-4">
                {childrenList.length > 0 && (
                    <ChildrenTable children={childrenList} className={'ml-4 mr-4'} onChildChange={childUpdated}/>
                )}
            </div>
            <div className="flex items-left ml-4">
                {childrenStatus === EleosChildrenStatusValue.hasChildren && (
                    <>
                    <AddPersonModal 
                        buttonText={childrenList.length ? 'Add another child' : 'Add a child'}
                        role={EleosRoleId.child}
                        needDob={true} 
                        existingPeople={[]}
                        onSave={onAddChild} />
                
                    </>
                )}
            </div>
            <EleosWizardButtonLayout leftChild={
                <EleosButton
                     type='wizard'
                     className="mr-1 mt-2"
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

export default AddChildren;
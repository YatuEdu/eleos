import React, { useState } 
                from 'react';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
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
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import RadioButtonGroup from 
                '../atoms/EleosRadioGroup';
import EleosChildrenStatus, { EleosChildrenStatusValue } 
                from '@/lib/client/model/EleosChildrenStatus';
import EleosRole, { EleosRoleId } 
                from '@/lib/client/model/EleosRole';
import ChildrenTable 
                from '../functional/ChildrenTable';
import { ADD_CHILD, MODAL_ID, eleosModalButtonId, excludeSetOptionForRadio, focusOnDomElement } 
                from '@/lib/client/utilies/UIHelper';
import EleosTitle from '../atoms/EleosTitle';
import EleosCheckButton from '../atoms/EleosCheckbutton';
import { BACK_TOOLTIP_EN, NEXT_TOOLTIP_HARD_TO_CHANGE_EN } from '@/lib/common/constant/StringConst';


const AddChildren: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
        throw Error('Eleos is not initialized')  
    }

    const childrenExisting = ref.current.children as EleosChild[]
    const hasChildrenInit = !!childrenExisting && childrenExisting.length > 0
    const [childrenStatus, setChildrenStatus] = useState(ref.current.childrenStatus);
    const [childrenList, setChildrenList] = useState(childrenExisting ? [...childrenExisting] : []); 
    const [valid, setValid] = useState(ref.current.childrenStatus === EleosChildrenStatusValue.hasNoChildren || ref.current.allChildrenIncluded)
    const [allChildrenIncluded, setAllChildrenIncluded] = useState(ref.current.allChildrenIncluded)

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
        //setValid(true)
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
            ref.current.childrenStatus = EleosChildrenStatusValue.hasNoChildren
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
        
        // all children are included
        ref.current.allChildrenIncluded = true

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
            const btnId = eleosModalButtonId(ADD_CHILD)
            focusOnDomElement(btnId)
            //setValid(childrenList.length > 0)
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllChildrenIncluded(event.target.checked)
        console.log('Checkbox checked:', event.target.checked)
        setValid(event.target.checked)
    }

    return (
        <div>
            <EleosTitle text="Add all children" />
            <div style={{ margin: 20 }}>
                <RadioButtonGroup
                    title=''
                    options={childrenOptions}
                    disabledOptions={excludeSetOptionForRadio(childrenOptions, childrenStatus)}
                    value={childrenStatus ? childrenStatus : ''}
                    onChange={handleHasChildren}
                    direction='row'
                />
            </div>
            <div className="mt-4">
                {childrenList.length > 0 && (
                    <ChildrenTable 
                        children={childrenList} className={'ml-4 mr-4'} 
                        onChildChange={childUpdated}
                        editDisabled={allChildrenIncluded}
                        />
                )}
            </div>
            <div className="flex items-left ml-4">
                {childrenStatus === EleosChildrenStatusValue.hasChildren && (
                    <>
                    {childrenList.length > 0 && 
                     <EleosCheckButton 
                        checked={allChildrenIncluded}
                        disabled={ref.current.allChildrenIncluded}
                        label={"Each child's information is accurate and no more child to add"} 
                        onChange={handleCheckboxChange} />}
                    {!allChildrenIncluded &&
                    <AddPersonModal 
                        id={ADD_CHILD + MODAL_ID}
                        buttonText={childrenList.length ? 'Add another child' : 'Add a child'}
                        role={EleosRoleId.child}
                        existingPeople={[]}
                        onSave={onAddChild} />
                    }
                
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
                     tipEnabled={BACK_TOOLTIP_EN} />
            } rightChild={
                <EleosButton
                    type='wizard'
                    className="mt-2"
                    disabled={!valid}
                    text="Save and Continue >" 
                    onClick={onNext}
                    tipDisable="Enter all the required info and then submit" 
                    tipEnabled={NEXT_TOOLTIP_HARD_TO_CHANGE_EN} />
            } />
        </div>
    );
};

export default AddChildren;
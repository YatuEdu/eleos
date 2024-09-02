import { useElos } 
                from "@/lib/providers/EleosAppProvider";
import EleosWizardButtonLayout 
                from "../atoms/EleosWizardButtonLayout";
import EleosButton 
                from "../atoms/EleosButton";
import { useState } 
                from "react";
import { useWizard } 
                from "@/lib/providers/WizardProvider";
import EleosTitle 
                from "../atoms/EleosTitle";
import EleosCollapsibleList
                from "../functional/EleosCollapsibleList";
import EleosLabel 
                from "../atoms/EleosLabel";
import { EleosCollapsibleListItemProps } 
                from "../functional/EleosCollapsibleListItem";

const Summary: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || !ref.current.marritalStatus)  {
        throw Error('Eleos is not initialized')  
    }
    const {setStep} = useWizard()
    const [valid, setValid] = useState(false)
    const [items, setItems] = useState([
        { id: 1, description: 'Son, 29 yr old' },
        { id: 2, description: 'Daughter, 25 yr old' },
      ]);

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
    }

    const eleosItems: EleosCollapsibleListItemProps[] = [
        {
            description: 'Basic Information',
            onUpdate: (updatedDescription: string) => {
                console.log('Basic Information updated', updatedDescription)
            }
        },
        {
            description: 'Add Executor',
            onUpdate: (updatedDescription: string) => {
                console.log('Add Executor updated', updatedDescription)
            }
        },
        {
            description: 'Marriage Information',
            onUpdate: (updatedDescription: string) => {
                console.log('Marriage Information updated', updatedDescription)
            }
        },
        {
            description: 'Add Children',
            onUpdate: (updatedDescription: string) => {
                console.log('Add Children updated', updatedDescription)
            }
        },
        {
            description: 'Children Guardian',
            onUpdate: (updatedDescription: string) => {
                console.log('Children Guardian updated', updatedDescription)
            }
        },
        {
            description: 'Will Summary',
            onUpdate: (updatedDescription: string) => {
                console.log('Will Summary updated', updatedDescription)
            }
        },
        {
            description: 'Add Asset',
            onUpdate: (updatedDescription: string) => {
                console.log('Add Asset updated', updatedDescription)
            }
        },
        {
            description: 'Asset Distribution Questions When Principal Goes',
            onUpdate: (updatedDescription: string) => {
                console.log('Asset Distribution Questions When Principal Goes updated', updatedDescription)
            }
        },
        {
            description: 'Asset Distribution Questions When Spouse Goes',
            onUpdate: (updatedDescription: string) => {
                console.log('Asset Distribution Questions When Spouse Goes updated', updatedDescription)
            }
        },
        {
            description: 'Asset Distribution Questions When Both Go',
            onUpdate: (updatedDescription: string) => {
                console.log('Asset Distribution Questions When Both Go updated', updatedDescription)
            }
        },
        {
            description: 'Complete and Payment',
            onUpdate: (updatedDescription: string) => {
                console.log('Complete and Payment updated', updatedDescription)
            }
        }
    ]

    const handleUpdateItem = (id: number, updatedDescription: string) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, description: updatedDescription } : item
          )
        )
      }

    return (
        <div>
            <EleosTitle text="Summary and Review" />
            <div className="mt-2 ml-4">
                <EleosLabel text="Principal infomation." />
                <EleosCollapsibleList items={items} onUpdateItem={handleUpdateItem}/>  
            </div> 
            <div className="mt-2 ml-4">
                <EleosLabel text="Spose infomation." />
                <EleosCollapsibleList items={items} onUpdateItem={handleUpdateItem}/>  
            </div>
            <div className="mt-2 ml-4">
                <EleosLabel text="Children infomation." />
                <EleosCollapsibleList items={items} onUpdateItem={handleUpdateItem}/>  
            </div>
            <div className="mt-2 ml-4">
                <EleosLabel text="Assets" />
                <EleosCollapsibleList items={items} onUpdateItem={handleUpdateItem}/>  
            </div>
            <div className="mt-2 ml-4">
                <EleosLabel text="Asset distribution" />
                <EleosCollapsibleList items={items} onUpdateItem={handleUpdateItem}/>  
            </div>
            <EleosWizardButtonLayout leftChild={
                <EleosButton
                    type='wizard'
                    className="mr-1 mt-2"
                    disabled={false}
                    text=" < Back" 
                    onClick={onPrev}
                /> } rightChild={
                <EleosButton
                    type='wizard'
                    className="mt-2"
                    disabled={!valid}
                    text="Save and Continue >" 
                    onClick={onNext} /> }
            />
        </div>
    )
}

export default Summary
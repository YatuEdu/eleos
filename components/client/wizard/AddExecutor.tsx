import { useElos } 
                from "@/lib/providers/EleosAppProvider";
import EleosWizardButtonLayout 
                from "../atoms/EleosWizardButtonLayout";
import EleosButton 
                from "../atoms/EleosButton";
import { useEffect, useState } 
                from "react";
import AddPersonModal 
                from "../functional/dialog/AddPersonModal";
import EexecutorTable 
                from "../functional/EexecutorTable";
import EleosEexecutor 
                from "@/lib/client/model/EleosEexcutor";
import EleosRole, { EleosRoleId } 
                from "@/lib/client/model/EleosRole";
import { useWizard } 
                from "@/lib/providers/WizardProvider";
import { ADD_EXECUTOR, eleosModalButtonId, focusOnDomElement } 
                from "@/lib/client/utilies/UIHelper";

const AddExecutor: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [executorList, setExecutorList] = useState(ref.current.executors ? [...ref.current.executors] : []);
    const [valid, setValid] = useState(false)
    const {setStep} = useWizard()

    const executorUpdated = (value: EleosRole) => {
        const executor =  value as EleosEexecutor 
        setExecutorList([...executorList, executor])
    }

    useEffect(() => {
        const modalBtnId = eleosModalButtonId(ADD_EXECUTOR)
        console.log('focusOnDomElement', modalBtnId)
        focusOnDomElement(modalBtnId)
    }, [])

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

    return  <>
        <div className="mt-4">
            {executorList && executorList.length > 0 && (
                <EexecutorTable executors={executorList} className={'ml-4 mr-4'} onEexecutorChange={executorUpdated}/>
            )}
        </div>
        <div className="flex items-left ml-4">
            {executorList.length < 3 && 
            <AddPersonModal
                id={ADD_EXECUTOR}
                buttonText={executorList.length ? 'Add alternate executor' : 'Add an executor'}
                role={EleosRoleId.executor}
                existingPeople={executorList}
                order={executorList.length + 1}
                onSave={executorUpdated} />
            }
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
    </>
}

export default AddExecutor
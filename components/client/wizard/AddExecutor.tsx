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
import EleosTitle from "../atoms/EleosTitle";
import EleosPerson from "@/lib/client/model/EleosPerson";

const AddExecutor: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const qualifiedExecutors = ref.current.qualifiedExecutors
    const [existingPeople, setExistingPeople] = useState(qualifiedExecutors)
    const [executorList, setExecutorList] = useState(ref.current.executors ? [...ref.current.executors] : [])
    const [valid, setValid] = useState(ref.current.executors.length > 0 )
    const {setStep} = useWizard()

    /**
     * handle the added executor
     * 
     * @param value 
     */
    const executoAdded = (value: EleosPerson) => {
        const executor =  value.getRole(EleosRoleId.executor) as EleosEexecutor
        setExecutorList([...executorList, executor])
        setValid(true)

    }

    /**
     * handle the updated executor
     * 
     * @param executorUpdated 
     */
    const executorUpdated = (executorUpdated: EleosEexecutor) => {
        const newEexecutors= executorList.map(ex => {
            if (ex.order === executorUpdated.order) {
                return executorUpdated
            }
            return ex
        })
        setExecutorList(newEexecutors)
    }

    useEffect(() => {
        const modalBtnId = eleosModalButtonId(ADD_EXECUTOR)
        console.log('focusOnDomElement', modalBtnId)
        focusOnDomElement(modalBtnId)
    }, [])

    useEffect(() => {
        setExistingPeople(qualifiedExecutors.filter(p => !executorList.find(e => e.person.id === p.id)))
    }, [executorList])

    const deleteExecutor = (executor: EleosEexecutor) => {
        if (!ref || !ref.current || !ref.current.principal)  {
            throw Error('Eleos is not initialized')  
        }

        // find the executor and remove it
        ref.current.removeExecutor(executor)
        
        // remove the executor from the UI
        const newExecutorList = executorList.filter(e => e.person.entityId !== executor.person.entityId)
        setExecutorList(newExecutorList)
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
         
        ref.current.addEexutors(executorList)

        // move to the next step
        const step = ref.current.nextStep()
        setStep(step)
    } 

    return  <>
        <EleosTitle text="Add will executors" />
        <div className="mt-4">
            {executorList && executorList.length > 0 && (
                <EexecutorTable<EleosEexecutor> 
                                title="Eidt executor"
                                executors={executorList} 
                                className={'ml-4 mr-4'} 
                                onEexecutorChange={executorUpdated} 
                                onEexecutorRemove={deleteExecutor}/>
            )}
        </div>
        <div className="flex items-left ml-4">
            {executorList.length < 3 && 
            <AddPersonModal
                id={ADD_EXECUTOR}
                buttonText={executorList.length ? 'Add alternate executor' : 'Add an executor'}
                role={EleosRoleId.executor}
                existingPeople={existingPeople}
                order={executorList.length + 1}
                onSave={executoAdded} />
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
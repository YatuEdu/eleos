import { useElos } 
                from "@/lib/providers/EleosAppProvider";
import EleosLabel 
                from "../atoms/EleosLabel";
import { useEffect, useState } 
                from "react";
import EleosItemTable 
, { TableRowAction }                
                from "./EleosItemTable";
import { EleosRelationshipType } 
                from "@/lib/client/model/EleosRelationshipType";
import GavelIcon  
                from '@mui/icons-material/VerifiedUser';
import PersonIcon 
                from '@mui/icons-material/Person';
import HandshakeIcon 
                from '@mui/icons-material/Handshake';
import WomanIcon 
                from '@mui/icons-material/Woman'; 
import EleosEexecutor 
                from "@/lib/client/model/EleosEexcutor";
import { RowData, WillExecutorBase } 
                from "@/lib/client/model/EleosMisc";
import ModifyExecutor 
                from "./dialog/ModifyExecutor";
import ConfirmationDialog 
                from "./dialog/ConfirmationDialog";
import { DEL_EXE_CONFIRMATION_MSG } from "@/lib/common/constant/StringConst";
import EleosGuardian from "@/lib/client/model/EleosGuardian";
import EleosPerson from "@/lib/client/model/EleosPerson";

interface EexecutorTableProps<T> {
    title: string
    executors: T[]
    className: string
    onEexecutorChange: (ex: T) => void
    onEexecutorRemove: (ex: T) => void
}

interface EleosChildTypIconAndToolTip {
    icon: JSX.Element;
    toolTip: string;
}

const EexecutorTable = <T extends WillExecutorBase>({ 
    title,
    executors, 
    className, 
    onEexecutorChange, 
    onEexecutorRemove 
}: EexecutorTableProps<T>) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [executorList, setExecutorList] = useState<T[] >(executors.sort((a, b) => a.order - b.order))
    const [currentEexcutor, setCurrentExecutor] = useState<T | null>(null)
    const [showModificationDialog, setShowModificationDialog] = useState(false)
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

    useEffect(() => {
        setExecutorList(executors.sort((a, b) => a.order - b.order))
    }, [executors])

    const getIconByRelation = (exe: T): EleosChildTypIconAndToolTip => {
        // Add a return statement at the end of the function
        if (exe.person.relationship === EleosRelationshipType.son) {
            return {icon: <PersonIcon />, toolTip: 'Adult Son'}
        }
        if (exe.person.relationship === EleosRelationshipType.daughter) {
            return {icon: <WomanIcon />, toolTip: 'Adult daughter'}
        }

        if (exe.person.relationship === EleosRelationshipType.lawyer) {
            return {icon: <GavelIcon  />, toolTip: 'Lawyer'}
        }
        
        if (exe.person.relationship === EleosRelationshipType.siblng) {
            return {icon: <PersonIcon  />, toolTip: 'Sibling'}
        }

        if (exe.person.relationship === EleosRelationshipType.other_relative) {
            return {icon: <PersonIcon  />, toolTip: 'Relative'}
        }

        return {icon: <HandshakeIcon />, toolTip: 'Friend'}
    }

    const onUpdateExecutor = (ex: T) => {
        onEexecutorChange(ex)
    }
    
    /**
     * Delete the selected executor and modify the order of the remaining executors
     */
    const deleteEecutor = () => {
        if (!currentEexcutor) {
            throw new Error('Current executor must be set')
        }
        const deleteRowindx = executorList.findIndex(e => e.person.entityId === currentEexcutor.person.entityId)
        if (deleteRowindx === -1) {
            throw new Error('Unexpected error: Executor not found')
        }  

        // remove the executor from the list
        const newExecutorList = executorList.filter(e => e.order !== currentEexcutor.order)

        // move up the executor order for remaing executors
        newExecutorList.forEach(e => {
            if (e.order > currentEexcutor.order) {
                e.order = e.order - 1
            }
        })
        setExecutorList(newExecutorList)
        setShowConfirmationDialog(false)
        onEexecutorRemove(currentEexcutor)
    }

    /**
     * Change orders of the executors between the selected executor and the one above it
     * 
     * @param ex 
     * @returns 
     */
    const moveUpEecutor = (ex: T) => {
        if (executorList.length < 2) {
            return
        }
       
        const upperRowindx = executorList.findIndex(e => e.order === ex.order - 1)
        if (upperRowindx === -1) {
            return  

        }

        // switch order
        ex.order = ex.order - 1
        executorList[upperRowindx].order = executorList[upperRowindx].order + 1
        const newExecutorList = [...executorList].sort((a, b) => a.order - b.order)
        setExecutorList(newExecutorList)
    }

    const handleRowChange = (changedRow: RowData, action: TableRowAction) => {
        const executor = executorList.find(e => e.display === changedRow.Name)
        if (!executor) {
           throw new Error('Executor not found')
        }
       
        setCurrentExecutor(executor)
        switch (action) {
            case TableRowAction.EDIT:
                setShowModificationDialog(true)
                break
            case TableRowAction.DELETE:
                setShowConfirmationDialog(true)
                break
            case TableRowAction.MOVE_UP:
                moveUpEecutor(executor)
                break
        }
    }
 
    return <div className={className}>
         <ConfirmationDialog
                open={showConfirmationDialog} 
                message={DEL_EXE_CONFIRMATION_MSG}
                title="Delete an executor from the will" 
                onConfirm={() => deleteEecutor()}
                onCancel={() => setShowConfirmationDialog(false)}
        />
        <ModifyExecutor 
                title={title}
                open={showModificationDialog} 
                close={() => setShowModificationDialog(false)} 
                existingPerson={currentEexcutor} onSave={onUpdateExecutor} 
        />
        <EleosLabel classNames='mb-2 mt-0' text='The executors of the will'/>
        <EleosItemTable
            rows={executorList.map((ex) => {
                const icon = getIconByRelation(ex)
                return { 
                    Name: ex.display, 
                    Relation: icon.icon,
                    ToolTip: icon.toolTip,
                    Type: ex.type(),     
                }
            })}
            columns={[
                { label: 'Name', type: 'text' },
                { label: 'Relation', type: 'icon',},
                { label: 'Type', type: 'text' },
                { label: 'Edit', type: 'pen' },
                { label: 'Change order', type: 'switch-up' },
                { label: 'Delete', type: 'delete' },
            ]}
            onChanged={handleRowChange}
        />
      
    </div>
}

export default EexecutorTable
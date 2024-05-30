import { useElos } 
                from "@/lib/providers/EleosAppProvider";
import EleosLabel 
                from "../atoms/EleosLabel";
import { use, useEffect, useState } 
                from "react";
import EleosChild 
                from "@/lib/client/model/EleosChild";
import EleosItemTable 
                from "./EleosItemTable";
import { EleosRelationshipType } 
                from "@/lib/client/model/EleosRelationshipType";
import ChildCareIcon 
                from '@mui/icons-material/ChildCare';
import PersonIcon 
                from '@mui/icons-material/Person';
import WomanIcon 
                from '@mui/icons-material/Woman'; 
import AddPersonModal 
                from "./dialog/AddPersonModal";
import EleosRole, { EleosRoleId } 
                from "@/lib/client/model/EleosRole";
import EleosEexecutor 
                from "@/lib/client/model/EleosEexcutor";

interface EexecutorTableProps {
    executors: EleosEexecutor[]
    className: string
    onEexecutorChange: (ex: EleosEexecutor) => void
}

interface EleosChildTypIconAndToolTip {
    icon: JSX.Element;
    toolTip: string;
}

const EexecutorTable: React.FC<EexecutorTableProps> = ({executors, className, onEexecutorChange}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [executorList, setExecutorList] = useState<EleosEexecutor[]>(executors)

    useEffect(() => {
        setExecutorList(executors)
    }, [executors])

    const getIconByRelation = (exe: EleosEexecutor): EleosChildTypIconAndToolTip => {
        // Add a return statement at the end of the function
        if (exe.person.relationship === EleosRelationshipType.son) {
            return {icon: <PersonIcon />, toolTip: 'Adult Son'}
        }
        if (exe.person.relationship === EleosRelationshipType.daughter) {
            return {icon: <WomanIcon />, toolTip: 'Adult daughter'}
        }

        throw new Error('Invalid relationship type')
    }

    const onUpdateExecutor = (ex: EleosRole) => {
        onEexecutorChange(ex as EleosEexecutor)
    }
    

    return <div className={className}>
        <EleosLabel classNames='mb-2 mt-0' text='The executors of the will'/>
        <EleosItemTable
            rows={executorList.map((ex) => {
                const icon = getIconByRelation(ex)
                return { 
                    Name: ex.display, 
                    Relation: icon.icon,
                    ToolTip: icon.toolTip,
                    Order: ex.order+'', 
                    '  ': <div className='mt-0'>
                         <AddPersonModal
                            buttonText={'Change'}
                            role={EleosRoleId.executor}
                            existingPeople={[]}
                            existingPerson={ex}
                            needDob={true} 
                            onSave={onUpdateExecutor} />
                    </div>
                        
                }
            })}
            columns={[
                { label: 'Name', type: 'text' },
                { label: 'Relation', type: 'icon',},
                { label: 'Age', type: 'text' },
                { label: '  ', type: 'button' },
            ]}
        />
      
    </div>
}

export default EexecutorTable
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
                from '@mui/icons-material/Woman'
import GroupIcon 
                from '@mui/icons-material/Group';
import AddPersonModal 
                from "./dialog/AddPersonModal";
import EleosRole, { EleosRoleId } 
                from "@/lib/client/model/EleosRole";
import EleosGuardian 
                from "@/lib/client/model/EleosGuardian";

interface GuadianTableProps {
    guardians: EleosGuardian[]
    className: string
    onGuardianChange: (c: EleosGuardian) => void
}

interface EleosChildTypIconAndToolTip {
    icon: JSX.Element;
    toolTip: string;
}

const GuadianTable: React.FC<GuadianTableProps> = ({guardians, className, onGuardianChange}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [existingGuardians, setExistingGuardians] = useState<EleosGuardian[]>(guardians)

    useEffect(() => {
        setExistingGuardians(guardians)
    }, [guardians])

    const getIconByRelation = (guardian: EleosGuardian): EleosChildTypIconAndToolTip => {
        // Add a return statement at the end of the function
        if (guardian.person.relationship === EleosRelationshipType.son || 
            guardian.person.relationship === EleosRelationshipType.uncle || 
            guardian.person.relationship === EleosRelationshipType.grandfather) {
            return {icon: <PersonIcon />, toolTip: guardian.person.relationship}
        }
        if (guardian.person.relationship === EleosRelationshipType.daughter ||
            guardian.person.relationship === EleosRelationshipType.aunt ||
            guardian.person.relationship === EleosRelationshipType.grandmother) {
                return {icon: <WomanIcon />, toolTip: guardian.person.relationship}
        } else {
            return {icon: <GroupIcon />, toolTip: guardian.person.relationship}
        }

        throw new Error('Invalid relationship type')
    }

    const onUpdateChild = (c:EleosRole) => {
        onGuardianChange(c as EleosGuardian)
    }

    return <div className={className}>
        <EleosItemTable
            rows={existingGuardians.map((g) => {
                const icon = getIconByRelation(g)
                return { 
                    Name: g.display, 
                    Relation: icon.icon,
                    ToolTip: icon.toolTip,
                    Email: g.person.email, 
                    Modify: <div className='mt-0'>
                         <AddPersonModal
                            buttonText={'Change'}
                            role={EleosRoleId.child_guardian}
                            existingPeople={[]}
                            existingPerson={g}
                            needEmail={true}
                            onSave={onUpdateChild} />
                    </div>
                        
                }
            })}
            columns={[
                { label: 'Name', type: 'text' },
                { label: 'Relation', type: 'icon',},
                { label: 'Email', type: 'text' },
                { label: 'Modify', type: 'button' },
            ]}
        />
      
    </div>
}

export default GuadianTable
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

interface ChildrenTableProps {
    children: EleosChild[]
    className: string
    onChildChange: (c: EleosChild) => void
}

interface EleosChildTypIconAndToolTip {
    icon: JSX.Element;
    toolTip: string;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({children, className, onChildChange}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [existingChildren, setexistingChildren] = useState<EleosChild[]>(children)

    useEffect(() => {
        setexistingChildren(children)
    }, [children])

    const getIconByRelation = (child: EleosChild): EleosChildTypIconAndToolTip => {
        // Add a return statement at the end of the function
        if (child.person.relationship === EleosRelationshipType.son) {
            if (child.isMinor) {
                return {icon: <ChildCareIcon />, toolTip: 'Minor Son'}
            } else {
                return {icon: <PersonIcon />, toolTip: 'Adult Son'}
            }
        }
        if (child.person.relationship === EleosRelationshipType.daughter) {
            if (child.isMinor) {
                return {icon: <ChildCareIcon />, toolTip: 'Minor daughter'}
            } else {
                return {icon: <WomanIcon />, toolTip: 'Adult daughter'}
            }
        }

        throw new Error('Invalid relationship type')
    }

    const onUpdateChild = (c:EleosRole) => {
        onChildChange(c as EleosChild)
    }
    

    return <div className={className}>
        <EleosLabel classNames='mb-2 mt-0'  text={`${ref.current.possessivePronouns} Children`} />
        <EleosItemTable
            rows={existingChildren.map((c) => {
                const icon = getIconByRelation(c)
                return { 
                    Name: c.display, 
                    Relation: icon.icon,
                    ToolTip: icon.toolTip,
                    Age: c.age+'', 
                    Modify: <div className='mt-0'>
                         <AddPersonModal
                            buttonText={'Change'}
                            role={EleosRoleId.child}
                            existingPeople={[]}
                            existingPerson={c}
                            needDob={true} 
                            onSave={onUpdateChild} />
                    </div>
                        
                }
            })}
            columns={[
                { label: 'Name', type: 'text' },
                { label: 'Relation', type: 'icon',},
                { label: 'Age', type: 'text' },
                { label: 'Modify', type: 'button' },
            ]}
        />
      
    </div>
}

export default ChildrenTable;
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
import ModifyChild 
                from "./dialog/ModifyChild";
import EleosRole, { EleosRoleId } 
                from "@/lib/client/model/EleosRole";
import { RowData } from "@/lib/client/model/EleosMisc";

interface ChildrenTableProps {
    children: EleosChild[]
    className: string
    onChildChange: (c: EleosChild) => void
    editDisabled: boolean
}

interface EleosChildTypIconAndToolTip {
    icon: JSX.Element;
    toolTip: string;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({children, className, onChildChange, editDisabled}) => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal)  {
        throw Error('Eleos is not initialized')  
    }

    const [existingChildren, setexistingChildren] = useState<EleosChild[]>(children)
    const [modifyChild, setModifyChild] = useState<EleosChild | null>(null)
    const [openModifyChild, setOpenModifyChild] = useState(false)

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

    const closeModifyChildDialog = () => {
        setOpenModifyChild(false)   
    }

    const handleRowChange = (changedRow: RowData) => {
        const child = existingChildren.find(c => c.display === changedRow.Name)
        if (!child) {
           throw new Error('Child not found')
        }
        setModifyChild(child)
        setOpenModifyChild(true)
    }

    return <div className={className}>
        <ModifyChild open={openModifyChild} close={closeModifyChildDialog} existingPerson={modifyChild} onSave={onUpdateChild} />
        <EleosLabel classNames='mb-2 mt-0'  text={`${ref.current.possessivePronouns} Children`} />
        <EleosItemTable
            rows={existingChildren.map((c) => {
                const icon = getIconByRelation(c)
                return { 
                    Name: c.display, 
                    Relation: icon.icon,
                    ToolTip: icon.toolTip,
                    Age: c.age+'', 
                }
            })}
            columns={[
                { label: 'Name', type: 'text' },
                { label: 'Relation', type: 'icon',},
                { label: 'Age', type: 'text' },
                { label: 'Edit', type: 'pen' }
            ]}
            onChanged={handleRowChange}
            disableEdit={editDisabled}
        />
      
    </div>
}

export default ChildrenTable;
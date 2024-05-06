
import React, { useEffect } 
                from 'react';
import EleosEntity 
                from "@/lib/client/model/EleosEntity"

interface EleosNamesProps {
    entities: EleosEntity[];
    onDelete?: (index: number) => void;
}

const EleosItemsList: React.FC<EleosNamesProps> = ({entities, onDelete}) => {
    useEffect(() => {
        if (entities.length > 0 ) {
            entities.forEach((p, index) => {
                console.log(p.display);
            });
        }
    }, [entities]);

    const handleDelete = (index: number) => {
        onDelete && onDelete(index); 
    };

    return (
        <div>
            {entities.length > 0 
             && <div >
                <ul className="w-full list-none p-0">
                    {entities.map((p, index) => (
                        <li key={"ELEOS_ass_" + p.id} className="flex w-full justify-between items-left bg-white px-4 py-1 shadow rounded my-2">
                            <span className="text-black text-sm">{p.display}</span>
                            {onDelete !== undefined && <button
                                onClick={() => handleDelete(index)}
                                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-700 transition-colors text-xs"
                            >Remove</button>}
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    );
}

export default EleosItemsList;

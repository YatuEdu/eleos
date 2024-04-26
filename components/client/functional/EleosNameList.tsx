import EleosPerson from '@/lib/client/model/EleosPerson';
import React, { useEffect, useState } from 'react';

interface EleosNamesProps {
    people: EleosPerson[];
    onDelete: (index: number) => void;
}

const EleosNamesList: React.FC<EleosNamesProps> = ({people, onDelete}) => {
    useEffect(() => {
        if (people.length > 0 ) {
            people.forEach((p, index) => {
                console.log(p.display());
            });
        }
    }, [people]);

    const handleDelete = (index: number) => {
        onDelete(index); 
    };

    return (
        <div>
            {people.length > 0 
             && <div className="w-full max-w-md ml-0 pl-4">
                <ul className="list-none p-0">
                    {people.map((p, index) => (
                        <li key={"ELEOSNAMES" + index} className="flex justify-between items-left bg-white px-4 py-1 shadow rounded my-2">
                            <span className="text-black text-sm">{p.display()}</span>
                            <button
                                onClick={() => handleDelete(index)}
                                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-700 transition-colors text-xs"
                            >Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            }
        </div>
    );
}

export default EleosNamesList;

import { RefObject, createContext } 
                from 'react'
import Eleos from 
                '@/lib/client/model/Eleos'
import { Language } 
                from '@/lib/client/model/EleosMisc';

export interface EleosContextType {
    ref: RefObject<Eleos>
    language: Language,
    setLanguage: (language: Language) => void
}
              
// Create a context, the initial value is undefined
export const EleosContext = createContext<EleosContextType | null> (null);



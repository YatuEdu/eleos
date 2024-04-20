import { RefObject, createContext } 
                from 'react'
import Eleos from 
                '@/lib/client/model/Eleos'

export interface EleosContextType {
    ref: RefObject<Eleos>;
}
              
// Create a context, the initial value is undefined
export const EleosContext = createContext<EleosContextType | null> (null);



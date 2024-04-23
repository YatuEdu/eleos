import { ChangeEvent } from "react";
import EleosInputBase from "./EleosInputBase";
import { EleosInputBaseProps } from "@/lib/client/model/EleosMisc";

class EleosInputEmail extends EleosInputBase {

    constructor(props: EleosInputBaseProps) {
        super(props)
    }

    /**
     * Override the validate method to check for email format
     * 
     * @param event 
     */
    validate = (email: string) => {
        if (!email) {
            return false
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            return false
        }   
        return true
    };

}

export default EleosInputEmail;
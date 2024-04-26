import { EleosState } from "./EleosState"

export interface EleosIApiResult {
    succeeded: boolean
    error?: string
}

export interface EleosInitInfo {
    userEmail: string
    userFirstName: string
    userMiddleName: string
    userLastName: string
    userSuffix: string
    userState: EleosState
}

export interface EleosInputBaseProps {
    name: string;
    value: string;
    regEx?: RegExp;
    mustHave?: boolean;
    onTextEntered: (value: string, isValid: boolean) => void;
}
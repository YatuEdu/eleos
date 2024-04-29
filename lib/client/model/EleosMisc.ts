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

export enum Language {
    En  = 1,
    Cn = 2,
};

export enum HelpTextId {
    EmailUsage = 1,
    Childrens = 2,
    Guardians  = 3,
    
    Id3 = 4,
    // Add more symbolic names as needed
};

export type HelpText = {
    en: string;
    cn: string;
}


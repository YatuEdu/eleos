import { EleosState } from "./EleosState"

export interface EleosApiResult {
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
    Marriage = 2,
    Marriage2 = 3,
    Childrens = 4,
    Guardians  = 5,
    Eexcutor = 6,
    
    Id3 = 4,
    // Add more symbolic names as needed
};

export type HelpText = {
    en: string;
    cn: string;
    subject: string;
}

export interface HelpTextObject {
    h2Subject: string;
    helpTextBody: string
}


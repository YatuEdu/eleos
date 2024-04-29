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

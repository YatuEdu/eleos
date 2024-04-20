import { EleosState } from "./EleosState"

export interface EleosInitInfo {
    userEmail: string
    userFirstName: string
    userMiddleName: string
    userLastName: string
    userSuffix: string
    userState: EleosState
}
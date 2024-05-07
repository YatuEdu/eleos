import { EleosRole } from "./EleosDataTypes"
import EleosPerson 
                from "./EleosPerson"
import { EleosState } 
                from "./EleosState"

class EleosPrincipal extends EleosPerson {
    private _email: string
    private _residenceState: EleosState

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                email: string, 
                state: EleosState) {
        super(firstName, middleName, lastName, suffix, EleosRole.principal)
        this._email = email
        this._residenceState = state
    }

    /**
     * getters
     */

    get email() { return this._email }

    get residenceState() { return this._residenceState }
}

export default EleosPrincipal
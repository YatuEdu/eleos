import { EleosRole } from "./EleosDataTypes"
import EleosPerson 
                from "./EleosPerson"
import { EleosRelationshipType } from "./EleosRelationshipType"
import { EleosState } 
                from "./EleosState"

class EleosPrincipal extends EleosPerson {
    private _residenceState: EleosState

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                email: string, 
                state: EleosState) {
        super(firstName, middleName, lastName, suffix, EleosRelationshipType.principal, EleosRole.principal)
        super.email = email
        this._residenceState = state
    }

    /**
     * getters
     */

    get residenceState() { return this._residenceState }
}

export default EleosPrincipal
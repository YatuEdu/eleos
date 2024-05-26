import EleosPerson 
                from "./EleosPerson"
import { EleosRelationshipType } 
                from "./EleosRelationshipType"
import EleosRole 
, { EleosRoleId }                from "./EleosRole"
import { EleosState } 
                from "./EleosState"

class EleosPrincipal extends EleosRole {
    private _residenceState: EleosState

    constructor(person: EleosPerson, 
                state: EleosState) {
        super(person, EleosRoleId.principal)
        this._residenceState = state
    }

    static create(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState): EleosPrincipal {
        const person = new EleosPerson(firstName, middleName, lastName, suffix, EleosRelationshipType.principal)
        person.email = email
        return new EleosPrincipal(person, state)
    }

    updateRole(principal: EleosPrincipal) {
        this._person.updatePerson(principal._person)
        this._person.email = principal._person.email
        this._residenceState = principal._residenceState
    }

    /**
     * overrides
     */

    get signature(): string {
        return `Principal person: ${this._person.display}, email: ${this._person.email}, state: ${this._residenceState.name}`
    }

    /**
     * getters
     */

    get residenceState() { return this._residenceState }
}

export default EleosPrincipal
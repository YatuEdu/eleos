import EleosRole  ,{ EleosRoleId }                
                from './EleosRole'
import EleosPerson 
                from './EleosPerson'
import { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType, } 
                from "./EleosRelationshipType";

class OtherBenificiary extends EleosRole {

    constructor(person: EleosPerson) {
        super(person, EleosRoleId.other_benificiary)
    }

    static create(firstName: string, middleName: string, lastName: string, suffix: string, relationship: EleosRelationshipType) {
        const person = new EleosPerson(firstName, middleName, lastName, suffix, relationship)
        return new OtherBenificiary(person)
    }

    get signature(): string {
        return `${this.display} (${ELEOS_RELATIONSHIP_TYPE_HELPER.valueToKey(this._person.relationship)})`
    }
}

export default OtherBenificiary
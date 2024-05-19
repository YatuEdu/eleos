import { EleosRole } 
                from "./EleosDataTypes";
import EleosPerson 
                from "./EleosPerson";
import { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType } 
                from "./EleosRelationshipType";

class OtherBenificiary extends EleosPerson {

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string, 
                relationship: EleosRelationshipType) {
        super(firstName, middleName, lastName, suffix, relationship, EleosRole.other_benificiary)
    }

    get signature(): string {
        return `${this.display} (${ELEOS_RELATIONSHIP_TYPE_HELPER.valueToKey(this.relationship)})`
    }
}

export default OtherBenificiary
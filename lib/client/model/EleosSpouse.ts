import EleosPerson 
                from "./EleosPerson"
import { EleosRelationshipType } 
                from "./EleosRelationshipType"
import EleosRole, { EleosRoleId }                
                from "./EleosRole"

class EleosSpouse extends EleosRole {

    constructor(person: EleosPerson) {
        super(person, EleosRoleId.spouse)
    }

    static create(firstName: string, middleName: string, lastName: string, suffix: string): EleosSpouse {
        const person = new EleosPerson(firstName, middleName, lastName, suffix, EleosRelationshipType.spouse)
        return new EleosSpouse(person)
    }

    /**
     * overrides
     */
    get id(): string {
        return 'Spouse'
     }
}

export default EleosSpouse
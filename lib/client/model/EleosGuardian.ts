import EleosRole  ,{ EleosRoleId }                
                from './EleosRole'
import EleosPerson 
                from './EleosPerson'
import { EleosRelationshipType } from './EleosRelationshipType';


class EleosGuardian extends EleosRole {
    private _email: string
    private _order: number

    constructor(person: EleosPerson, email: string, order: number) {
        super(person, EleosRoleId.child_guardian);
        this._email = email;
        this._order = order;
    }

    static create(firstName: string, midtName: string, lastName: string, suffix: string, 
                  relation: EleosRelationshipType, email: string, order: number) : EleosGuardian {
        const person = new EleosPerson(firstName, midtName, lastName, suffix, relation)
        person.email = email
        return new EleosGuardian(person, email, order)
    }

    /**
     * getters
     */

    get order() { return this._order; } 

    get isPrimary() { return this._order === 1 }

    get isSecondary() { return this._order === 2 }

    get isTertiary () { return this._order === 3 }

    /**
     * public methods
     */

    get signature(): string {
        return `${this.display} ${this.isPrimary ? '(primary guardian)' : this.isSecondary ? '(alternative guardian1)' : '(alternative guardian2)'}`
    }
}

export default EleosGuardian
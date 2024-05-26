import EleosRole  ,{ EleosRoleId }                
                from './EleosRole'
import EleosPerson 
                from './EleosPerson'
import { EleosRelationshipType } from './EleosRelationshipType';


class EleosGuardian extends EleosRole {
    private _order: number

    constructor(person: EleosPerson, email: string, order: number) {
        super(person, EleosRoleId.child_guardian);
        this._person.email = email;
        this._order = order;
    }

    static create(firstName: string, midtName: string, lastName: string, suffix: string, 
                  relation: EleosRelationshipType, email: string, order: number) : EleosGuardian {
        const person = new EleosPerson(firstName, midtName, lastName, suffix, relation)
        person.email = email
        return new EleosGuardian(person, email, order)
    }

    updateRole(guardian: EleosGuardian) {
        this._person.email = guardian._person.email
        this._order = guardian._order
    }

    clone (person: EleosPerson): EleosRole {
        return new EleosGuardian(person, this.email, this.order)
    }

    /**
     * getters
     */

    get order() { return this._order } 

    set order(order: number) { this._order = order } 

    get isPrimary() { return this._order === 1 }

    get isSecondary() { return this._order === 2 }

    get isTertiary () { return this._order === 3 }

    get email() { return this._person.email }

    set email(email: string) { this._person.email = email }

    /**
     * public methods
     */

    get signature(): string {
        return `${this.email} ${this.order}'}`
    }
}

export default EleosGuardian
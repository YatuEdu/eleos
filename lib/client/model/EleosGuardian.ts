import EleosRole  ,{ EleosRoleId }                
                from './EleosRole'
import EleosPerson 
                from './EleosPerson'
import { EleosRelationshipType } from './EleosRelationshipType';
import { EmailOrPhone } from './EleosDataTypes';


class EleosGuardian extends EleosRole {
    private _order: number

    constructor(person: EleosPerson, emailOrPhone: EmailOrPhone | undefined, order: number) {
        super(person, EleosRoleId.child_guardian);
        this._person.emailOrPhone = emailOrPhone;
        this._order = order;
    }

    static create(firstName: string, midtName: string, lastName: string, suffix: string, 
                  relation: EleosRelationshipType, emailOrPhone: EmailOrPhone, order: number) : EleosGuardian {
        const person = new EleosPerson(firstName, midtName, lastName, suffix, relation)
        return new EleosGuardian(person, emailOrPhone, order)
    }

    updateRole(guardian: EleosGuardian) {
        this._person.emailOrPhone = guardian._person.emailOrPhone
        this._order = guardian._order
    }

    clone (person: EleosPerson): EleosRole {
        return new EleosGuardian(person, this.emailOrPhone, this.order)
    }

    /**
     * getters
     */

    get order() { return this._order } 

    set order(order: number) { this._order = order } 

    get isPrimary() { return this._order === 1 }

    get isSecondary() { return this._order === 2 }

    get isTertiary () { return this._order === 3 }

    get emailOrPhone(): EmailOrPhone | undefined { return this._person.emailOrPhone }

    set emailOrPhone(emailOrPhone: EmailOrPhone | undefined) { this._person.emailOrPhone = emailOrPhone }

    /**
     * public methods
     */

    get signature(): string {
        return `${this.emailOrPhone} ${this.order}'}`
    }
}

export default EleosGuardian
import EleosRole  ,{ EleosRoleId }                
                from './EleosRole'
import EleosPerson 
                from './EleosPerson'
import { EleosRelationshipType } 
                from './EleosRelationshipType';
import  EmailOrPhone from 
                './EmailOrPhone';
import { WillExecutorBase } from './EleosMisc';


class EleosGuardian extends EleosRole implements WillExecutorBase{
    private _order: number

    constructor(person: EleosPerson, emailOrPhone: EmailOrPhone | undefined, order: number) {
        super(person, EleosRoleId.child_guardian);
        if (emailOrPhone) {
            this._person.emailOrPhone = emailOrPhone
        }
        this._order = order;
    }

    static create(firstName: string, midtName: string, lastName: string, suffix: string, 
                  relation: EleosRelationshipType, emailOrPhone: EmailOrPhone | undefined, order: number) : EleosGuardian {
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

    type(): string {
        return this._order === 1 ? 'Primary' : this._order === 2 ? 'Alternate 1' : 'Alternate 2'
    }

    set order(order: number) { this._order = order } 

    get isPrimary() { return this._order === 1 }

    get isSecondary() { return this._order === 2 }

    get isTertiary () { return this._order === 3 }

    get emailOrPhone(): EmailOrPhone | undefined { return this._person.emailOrPhone }

    set emailOrPhone(emailOrPhone: EmailOrPhone) { this._person.emailOrPhone = emailOrPhone }

    /**
     * public methods
     */

    get signature(): string {
        return `${this.emailOrPhone} ${this.order}'}`
    }
}

export default EleosGuardian
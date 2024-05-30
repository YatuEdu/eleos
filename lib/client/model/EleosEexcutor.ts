import EleosPerson 
                from "./EleosPerson";
import { EleosRelationshipType } from "./EleosRelationshipType";
import EleosRole, { EleosRoleId } 
                from "./EleosRole";

class EleosEexecutor extends EleosRole {
    private _order: number

    private constructor(person: EleosPerson, order: number) {
        super(person, EleosRoleId.executor)
        this._order = order
    }

    static createFromUi(firstName: string, middleName:string, lastName: string, suffix: string, email: string, phone: string, orddr: number, relationship: EleosRelationshipType): EleosEexecutor {
        if (relationship !== EleosRelationshipType.son && relationship !== EleosRelationshipType.daughter) {
            throw new Error('Invalid relationship type for a child')
        }
        if (orddr < 1 || orddr > 3) {
            throw new Error('Invalid order for an executor')
        }
        if (!email && !phone) {
            throw new Error('An executor must have an email or a phone number')
        }
        const person = new EleosPerson(firstName, middleName, lastName, suffix, relationship)
        person.email = email
        person.phone = phone
        return new EleosEexecutor(person, -1);
    }

    updateRole(eexecutor: EleosEexecutor): void {
        this._person.updatePerson(eexecutor.person)
        this._order = eexecutor.order
    
    }

    clone(person: EleosPerson): EleosRole {
        return new EleosEexecutor(person, this._order)
    }

    get order(): number {
        return this._order
    }

    set order(order: number) {
        this._order = order
    }
}

export default EleosEexecutor
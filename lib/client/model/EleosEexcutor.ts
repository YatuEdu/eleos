import EleosChild from "./EleosChild";
import EleosPerson 
                from "./EleosPerson";
import { EleosRelationshipType } 
                from "./EleosRelationshipType";
import EleosRole, { EleosRoleId } 
                from "./EleosRole";
import EmailOrPhone from "./EmailOrPhone";

class EleosEexecutor extends EleosRole {
    private _order: number

    private constructor(person: EleosPerson, order: number) {
        super(person, EleosRoleId.executor)
        this._order = order
    }

    static createFromUi(firstName: string, middleName:string, lastName: string, suffix: string, 
                        emailOrPhone: EmailOrPhone | undefined, orddr: number, relationship: EleosRelationshipType, 
                        birthYear: number): EleosEexecutor {
        if (relationship !== EleosRelationshipType.son && relationship !== EleosRelationshipType.daughter) {
            throw new Error('Invalid relationship type for a child')
        }
        if (orddr < 1 || orddr > 3) {
            throw new Error('Invalid order for an executor')
        }

        let person = null
        if (EleosPerson.isChildRetaionship(relationship)) { 
            const child  = EleosChild.createFromUi(firstName, middleName, lastName, suffix, birthYear, relationship)
            if (child.isMinor) {
                throw new Error('Executor cannot be a minor')
            }
            child.person.emailOrPhone = emailOrPhone
            person = child.person
        } else {
            person = new EleosPerson(firstName, middleName, lastName, suffix, relationship)
            person.emailOrPhone = emailOrPhone
        }
       
        return new EleosEexecutor(person, orddr)
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
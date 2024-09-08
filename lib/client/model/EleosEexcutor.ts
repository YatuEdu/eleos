import EleosChild from "./EleosChild";
import EleosPerson 
                from "./EleosPerson";
import EleosRelationshipTypeHelper, { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType } 
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
                        birthYear: number | undefined): EleosEexecutor {
        const age = birthYear ? new Date().getFullYear() - birthYear : 18
        if (EleosRelationshipTypeHelper.isChild(relationship) && age < 18){
            throw new Error('Executor cannot be a minor')
        }
        if (orddr < 1 || orddr > 3) {
            throw new Error('Invalid order for an executor')
        }

        let person = null
        if (EleosPerson.isChildRetaionship(relationship)) { 
                throw new Error('Executor cannot be a new child')
        } else {
            person = new EleosPerson(firstName, middleName, lastName, suffix, relationship)
            person.emailOrPhone = emailOrPhone
        }
       
        return new EleosEexecutor(person, orddr)
    }

    static createFromUiFromExistingPerson(person: EleosPerson, orddr: number): EleosEexecutor {
        if (person.isChildAndMinor) {
            throw new Error('Executor cannot be a minor')
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

    get age(): string {
        return this.person.isChild ? (this.person.getRole(EleosRoleId.child) as EleosChild).age+'' : 'Adult'
    }

    set order(order: number) {
        this._order = order
    }
}

export default EleosEexecutor
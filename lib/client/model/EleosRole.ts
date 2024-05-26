import EleosEntity 
                from "./EleosEntity";
import EleosPerson 
                from "./EleosPerson";

export enum EleosRoleId {
    principal = 'principal',
    spouse = 'spouse',
    child = 'child',
    other_benificiary = 'other_benificiary',
    exSpouse = 'exSpouse',
    executor = 'executor',
    child_guardian = 'child_guardian',
    power_of_attorney = 'power_of_attorney',
    lawyer = 'lawyer',
    witness = 'witness',
    other = 'other',
}
   

class EleosRole extends EleosEntity {
    protected _person: EleosPerson
    protected _id: EleosRoleId

    constructor(person: EleosPerson, id: EleosRoleId) {
        super()
        this._id = id
        this._person = person
        person.roles[id] = this
    }

    get person () {
        return this._person
    }
    
    get display(): string {
        return  this._person.display
    }

    get roleId() {
        return this._id
    }

    updateRole(role: EleosRole) {
        throw new Error('Method not implemented.')
    }
    
    clone(person: EleosPerson): EleosRole {
        throw new Error('Method not implemented.')
    }
}

export default EleosRole
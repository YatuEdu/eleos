import EleosEntity 
                from "./EleosEntity";
import EleosPerson 
                from "./EleosPerson";

export enum EleosRoleId {
    principal = 'principal',
    spouse = 'spouse',
    executor = 'executor',
    child = 'child',
    child_guardian = 'child_guardian',
    other_benificiary = 'other_benificiary',
    other = 'other',
    exSpouse = 'exSpouse',
    power_of_attorney = 'power_of_attorney',
    lawyer = 'lawyer',
    witness = 'witness',
}
   

class EleosRole{
    protected _person: EleosPerson
    protected _id: EleosRoleId

    constructor(person: EleosPerson, id: EleosRoleId) {
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

    get signature(): string {
        throw new Error('signature method not implemented. Child Needs to implement this method')
     }
}

export default EleosRole
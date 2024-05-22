import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import EleosRole  ,{ EleosRoleId }                
                from './EleosRole';
import { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType, } 
                from './EleosRelationshipType';

class EleosChild extends EleosRole {
    private _birthYear: number;
    private _childId: number;

    constructor(person: EleosPerson, birthYear: number, id: number) {
        super(person, EleosRoleId.child)
        this._birthYear = birthYear
        this._childId = id
    }

    static createFromUi(firstName: string, middleName:string, lastName: string, suffix: string, birthYear: number, relationship: EleosRelationshipType): EleosChild {
        if (relationship !== EleosRelationshipType.son && relationship !== EleosRelationshipType.daughter) {
            throw new Error('Invalid relationship type for a child')
        }
        const child = new EleosPerson(firstName, middleName, lastName, suffix, relationship)
        return new EleosChild(child, birthYear, -1);
    }

   static create(person: EleosPerson, birthYear: number, id: number): EleosChild {
        return new EleosChild(person, birthYear, id);
    }

    get birthYear(): number {
        return this._birthYear;
    }

    get isMinor(): boolean {
        return new Date().getFullYear() - this.birthYear < 18
    }

    get id(): string {
        return 'Child'
    }

    get signature(): string {
        return `${this.display} (${this._person.relationship} age: ${new Date().getFullYear() - this.birthYear})`
    }

    get childId(): number {
        return this._childId
    }

    set childId(id: number) {
        this._childId = id
    }
}

export default EleosChild;
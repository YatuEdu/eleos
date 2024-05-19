import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import { EleosRole } 
                from './EleosDataTypes';
import { ELEOS_RELATIONSHIP_TYPE_HELPER, EleosRelationshipType } from './EleosRelationshipType';

class EleosChild extends EleosPerson {
    private birthYear: number;

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string, 
                relationship: EleosRelationshipType,
                birthYear: number) {
        super(firstName, middleName, lastName, suffix, relationship, EleosRole.child);
        this.birthYear = birthYear;
    }

    // Add any additional methods or properties here

    getBirthYear(): number {
        return this.birthYear;
    }

    get isMinor(): boolean {
        return new Date().getFullYear() - this.birthYear < 18
    }

    get signature(): string {
        return `${this.display} (${ELEOS_RELATIONSHIP_TYPE_HELPER.valueToKey(this.relationship)} age: ${new Date().getFullYear() - this.birthYear})`
    }
}

export default EleosChild;
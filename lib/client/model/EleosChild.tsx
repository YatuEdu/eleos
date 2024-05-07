import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import { EleosRole } 
                from './EleosDataTypes';

class EleosChild extends EleosPerson {
    private birthYear: number;

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string, 
                birthYear: number) {
        super(firstName, middleName, lastName, suffix, EleosRole.child);
        this.birthYear = birthYear;
    }

    // Add any additional methods or properties here

    // Example method
    getBirthYear(): number {
        return this.birthYear;
    }

    get isMinor(): boolean {
        return new Date().getFullYear() - this.birthYear < 18
    }

    get signature(): string {
        return `${this.display} (age: ${new Date().getFullYear() - this.birthYear})`
    }
}

export default EleosChild;
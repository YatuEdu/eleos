import EleosPerson 
                from '@/lib/client/model/EleosPerson';

class EleosChild extends EleosPerson {
    private birthYear: number;

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string, 
                birthYear: number) {
        super(firstName, middleName, lastName, suffix);
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

    get display(): string {
        return `${this.firstName} ${this.middleName} ${this.lastName} ${this.suffix} (age: ${new Date().getFullYear() - this.birthYear})`
    }
}

export default EleosChild;
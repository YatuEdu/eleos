import { EleosRole } from './EleosDataTypes';
import EleosPerson 
                from './EleosPerson';

class EleosGuardian extends EleosPerson {
    private _email: string;
    private _order: number;

    constructor(firstName: string, 
        middleName: string,
        lastName: string,
        suffix: string,
        email: string, order: number) {
        super(firstName, middleName, lastName, suffix, EleosRole.child_guardian);
        this._email = email;
        this._order = order;
    }

    /**
     * getters
     */
    get email() { return this._email; }

    get order() { return this._order; } 

    get isPrimary() { return this._order === 1 }

    get isSecondary() { return this._order === 2 }

    get isTertiary () { return this._order === 3 }

    /**
     * public methods
     */

    get signature(): string {
        return `${this.display} ${this.isPrimary ? '(primary guardian)' : this.isSecondary ? '(alternative guardian1)' : '(alternative guardian2)'}`
    }
}

export default EleosGuardian
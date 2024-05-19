import { EleosRole } 
                from './EleosDataTypes';
import EleosPerson 
                from './EleosPerson';
import { EleosRelationshipType } 
                from './EleosRelationshipType';

class EleosGuardian extends EleosPerson {
  
    private _order: number;

    constructor(firstName: string, 
        middleName: string,
        lastName: string,
        suffix: string,
        relationship: EleosRelationshipType,
        email: string, order: number) {
        super(firstName, middleName, lastName, suffix, relationship, EleosRole.child_guardian);
        super.email = email;
        this._order = order;
    }

    /**
     * getters
     */

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
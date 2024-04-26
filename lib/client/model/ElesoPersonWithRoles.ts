import EleosPerson 
                from "./EleosPerson"

class ElesoPersonWithRoles extends EleosPerson {
    private _role: EleosRole
    private _relation: EleosRelation

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                role: EleosRole,
                relation: EleosRelation) {
        super(firstName, middleName, lastName, suffix)
        this._role = role
        this._relation = relation
    }

    /**
     * Public methods
     */
    isEqual(other: ElesoPersonWithRoles) {
        return this.firstName === other.firstName &&
        this.middleName === other.middleName &&
        this.lastName === other.lastName &&
        this.suffix === other.suffix &&
        this._role === other._role &&
        this._relation === other.relation
    }

    /**
     * getters
     */

    get role() { return this._role }

    get relation() { return this._relation }
}

export default ElesoPersonWithRoles
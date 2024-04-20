import EleosPerson 
                from "./EleosPerson"

class ElesoPersonWithRoles extends EleosPerson {
    #role: EleosRole
    #relation: EleosRelation

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                role: EleosRole,
                relation: EleosRelation) {
        super(firstName, middleName, lastName, suffix)
        this.#role = role
        this.#relation = relation
    }

    /**
     * Public methods
     */
    isEqual(other: ElesoPersonWithRoles) {
        return this.firstName === other.firstName &&
        this.middleName === other.middleName &&
        this.lastName === other.lastName &&
        this.suffix === other.suffix &&
        this.#role === other.#role &&
        this.#relation === other.relation
    }

    /**
     * getters
     */

    get role() { return this.#role }

    get relation() { return this.#relation }
}

export default ElesoPersonWithRoles
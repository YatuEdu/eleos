class EleosPerson {
    #firstName: string
    #middleName: string
    #lastName: string
    #suffix: string

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string) {
        this.#firstName = firstName
        this.#middleName = middleName
        this.#lastName = lastName
        this.#suffix = suffix
    }

    /**
     * getters
     */

    get firstName() { return this.#firstName }

    get middleName() { return this.#middleName }

    get lastName() { return this.#lastName }

    get suffix() { return this.#suffix }

}

export default EleosPerson
import EleosPerson 
                from "./EleosPerson"
import { EleosState } 
                from "./EleosState"

class EleosPrincipal extends EleosPerson {
    #email: String
    #residenceState: EleosState

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                email: string, 
                state: EleosState) {
        super(firstName, middleName, lastName, suffix)
        this.#email = email
        this.#residenceState = state
    }

    /**
     * getters
     */

    get email() { return this.#email }

    get residenceState() { return this.#residenceState }
}

export default EleosPrincipal
import EleosPerson 
                from "./EleosPerson"
import EleosPrincipal 
                from "./EleosPrincipal"
import { EleosState } 
                from "./EleosState"
import ElesoPersonWithRoles 
                from "./ElesoPersonWithRoles"

/**
 * Eleos encapsulate all the data regarding a will processing wizard, including principals, children, and
 * other people related to this will
 */
class Eleos {

    #principal: EleosPrincipal | null
    #spouse: string | null 
    #people: ElesoPersonWithRoles[] 
    #step: number = 0

    constructor() {
        this.#principal = null
        this.#spouse = null
        this.#people = []
    }

    init(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState) {
        this.#principal = new EleosPrincipal(firstName, middleName, lastName, suffix, email, state)
        console.log(`principal added ${email}, ${this.#principal.lastName} ---`)
        this.#step = 1
    }

     /**
     * getters
     */
    get step() { return this.#step}

    nextStep() { this.#step += 1}

    prevStep() { this.#step -= 1}

    get principal() { return this.#principal}

    get spouse(): string | null { return this.#spouse}

    set spouse(spouse: string) { this.#spouse = spouse}
     

    /**
     * setters
     */
    addPersonWithRoles(person: ElesoPersonWithRoles) {
        // cannot add the same person twice
        if ( this.#people.find(p => p.isEqual(person))) {
            throw Error('The user is already added!')
        }
        // ok to add
        this.#people.push(person)

    }
}

export default Eleos

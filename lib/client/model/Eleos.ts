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

    #principal: EleosPrincipal
    #people: ElesoPersonWithRoles[] 

    constructor(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState) {
        this.#principal = new EleosPrincipal(firstName, middleName, lastName, suffix, email, state)
        this.#people = []
    }
    
     /**
     * getters
     */

     get principal() { return this.#principal}

     get people() { return this.#people}

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

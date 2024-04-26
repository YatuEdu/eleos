import EleosChild 
                from "./EleosChild"
import { EleosIApiResult } 
                from "./EleosMisc"
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

    private _principal: EleosPrincipal | null = null
    private _spouse: EleosPerson | null = null
    private _children: EleosChild[] = []
    private _people: ElesoPersonWithRoles[] = []
    private _step: number = 0

    constructor() {
        this._principal = null
        this._spouse = null
        this._children = []
        this._people = []
        this._step = 0
    }

    init(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState) {
        this._principal = new EleosPrincipal(firstName, middleName, lastName, suffix, email, state)
        console.log(`principal added ${email}, ${this._principal.lastName} ---`)
        this._step = 1
    }

     /**
     * getters
     */
    get step() { return this._step}

    nextStep() { this._step += 1}

    prevStep() { this._step -= 1}

    get principal() { return this._principal}

    get spouse(): EleosPerson | null { return this._spouse}

    get people() { return this._people}
    
    get children() {return  this._children  }


    /**
     * setters
     */

    /**
     * 
     * public methods
     */

    setSpouse(spouse: EleosPerson | null): EleosIApiResult { 
        if (!spouse) {
            this._spouse = null
            return {succeeded: true}
        }

        // make sure spouse and principal are not the same
        if (this._principal && EleosPerson.equealTo(this._principal, spouse)) {
            return {succeeded: false, error: 'Spouse cannot be the same as the principal'}
        }
        this._spouse = spouse
        return {succeeded: true}
    }

    resetChildren() {
        this._children = []
    }

    checkPersonExists(person: EleosPerson): boolean  {
        // check if the person is the proincipal
        if (this._principal && EleosPerson.equealTo(this._principal, person)) {
            return true
        }
          
        // check if the person is the spouse
        if (this._spouse && EleosPerson.equealTo(this._spouse, person)) {
            return true
        }
       
        return false
    }

    addChildren(children: EleosChild[]): EleosIApiResult  {
        // make sure that none of the child is princal himself
        if (this._principal && children.find(c => this._principal && EleosPerson.equealTo(this._principal, c))) {
            return {succeeded: false, error: 'Child cannot be the same as the principal'}
        }
         // make sure that none of the child is spouse himself
        if (this._spouse && children.find(c => this._spouse && EleosPerson.equealTo(this._spouse, c))) {
            return {succeeded: false, error: 'Child cannot be the same as the spouse'}
        }
        this._children = children
        return {succeeded: true};
    }

    addPersonWithRoles(person: ElesoPersonWithRoles) {
        // cannot add the same person twice
        if ( this._people.find(p => p.isEqual(person))) {
            throw Error('The user is already added!')
        }
        // ok to add
        this._people.push(person)
    }
}

export default Eleos

import { WizardStep } 
                from "@/lib/providers/WizardProvider"
import EleosChild 
                from "./EleosChild"
import EleosGuardian 
                from "./EleosGuardian"
import EleosHelpText 
                from "./EleosHelpText"
import { EleosIApiResult, HelpTextObject, Language } 
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
    private _helpText: EleosHelpText = new EleosHelpText()
    private _principal: EleosPrincipal | null = null
    private _spouse: EleosPerson | null = null
    private _children: EleosChild[] = []
    private _guardians: EleosGuardian[] = []
    private _people: ElesoPersonWithRoles[] = []
    private _steps: number[] = []

    init(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState) {
        this._principal = new EleosPrincipal(firstName, middleName, lastName, suffix, email, state)
        console.log(`principal added ${email}, ${this._principal.lastName} ---`)
        this._steps.push(WizardStep.BASIC_INFO)
    }

     /**
     * getters
     */
    get step() { return this._steps.length > 0 ? this._steps[this._steps.length - 1] : 0}

    nextStep() { 
        let currentStep = this.step
        switch (currentStep) {
            case 0:
                this._steps.push(WizardStep.BASIC_INFO)
                break
            case WizardStep.BASIC_INFO: 
                this._steps.push(WizardStep.MARRIAGE_INFO)
                break
            case WizardStep.MARRIAGE_INFO:
                this._steps.push(WizardStep.ADD_CHILDREN)
                break
            case WizardStep.ADD_CHILDREN:
                if (this,this.minors.length > 0) {
                    this._steps.push(WizardStep.CHILDREN_GUARDIAN)
                } else {
                    this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS)
                }
                break
            case WizardStep.CHILDREN_GUARDIAN:
                this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS)
                break
            case WizardStep.ASSET_DISTRIBUTION_QUESTIONS:
                    this._steps.push(WizardStep.MARRIED_PACKAGE)
                    break
            case WizardStep.MARRIED_PACKAGE:
                this._steps.push(WizardStep.COMPLETE_AND_PAYMENT)
                break
            case WizardStep.COMPLETE_AND_PAYMENT:
                break
        }
        return this.step
    }

    prevStep() { 
        if (this._steps.length <= 1) {
            throw Error('No more steps to go back')
        } 
        this._steps.pop()
        return this.step
    }

    get lang() { return this._helpText.language} 

    set lang(lang: Language) { this._helpText.setLanguage(lang)}

    get principal() { return this._principal}

    get spouse(): EleosPerson | null { return this._spouse}

    get people() { return this._people}
    
    get children() {return  this._children  }

    get minors(): EleosChild[] {
        return this._children.filter(c => c.isMinor)
    }

    get guardians() { return this._guardians}


    /**
     * setters
     */

    /**
     * 
     * public methods
     */

    /**
     * get help text by id
     * 
     * @param id 
     * @returns 
     */
    public getHelpText(ids: number[]): HelpTextObject[] {
        let results: HelpTextObject[] = []
        for (let id of ids) {
            const textEntry: HelpTextObject | undefined = this._helpText.getHelpText(id);
            if (!textEntry) {
                throw Error(`Help text for ID ${id} not found`)
            }
            results.push(textEntry)
        }
        return results
    }

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

    addGuardians(guardians: EleosGuardian[]): EleosIApiResult {
        // need to have minors
        if (this._children.length === 0 || this.minors.length === 0) {
            return {succeeded: false, error: 'Need to have at least a minor child to have guardians'}
        }  
        
        // make sure that none of the guardian is princal himself
        if (this._principal && guardians.find(c => this._principal && EleosPerson.equealTo(this._principal, c))) {
            return {succeeded: false, error: 'Guardian must be an adult other than the parents'}
        }
         // make sure that none of the guardian is spouse himself
        if (this._spouse && guardians.find(c => this._spouse && EleosPerson.equealTo(this._spouse, c))) {
            return {succeeded: false, error: 'Guardian must be an adult other than the parents'}
        }
          
        // make sure that none of the guardian is a child himself
        const filteredArray = guardians.filter( g => !this._children.find(c => EleosPerson.equealTo(c, g)))
        if (filteredArray.length !== guardians.length) {
            return {succeeded: false, error: 'Guardian cannot be a one of the child'}
        }
      
        this._guardians = guardians
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

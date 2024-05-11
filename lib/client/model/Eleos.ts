import { WizardStep } 
                from "@/lib/providers/WizardProvider"
import EleosChild 
                from "./EleosChild"
import EleosGuardian 
                from "./EleosGuardian"
import EleosHelpText 
                from "./EleosHelpText"
import { EleosApiResult, HelpTextObject, Language } 
                from "./EleosMisc"
import EleosPerson 
                from "./EleosPerson"
import EleosPrincipal 
                from "./EleosPrincipal"
import { EleosState } 
                from "./EleosState"
import { EleosAsset } 
                from "./EleosAsset"
import { EleosMaritalStatus, EleosRole } 
                from "./EleosDataTypes"
import { error } from "console"
import { EleosChildrenStatusValue } 
                from "./EleosChildrenStatus"
import { EleosAssetOwnerShipType } from "./EleosAssetOwnerShipType"

/**
 * Eleos encapsulate all the data regarding a will processing wizard, including principals, children, and
 * other people related to this will
 */
class Eleos {
    private _helpText: EleosHelpText = new EleosHelpText()
    private _assets: EleosAsset[] = []
    private _people: Map<string, EleosPerson> = new Map()
    private _marritalStatus: EleosMaritalStatus | undefined = undefined
    private _childrenStatus: EleosChildrenStatusValue | undefined = undefined

    private _steps: number[] = []

    init(firstName: string, middleName: string, lastName: string, suffix: string, email: string, state: EleosState) {
        const principal = new EleosPrincipal(firstName, middleName, lastName, suffix, email, state)
        this._people.set(principal.display, principal) 
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
                if (this.minors.length > 0) {
                    this._steps.push(WizardStep.CHILDREN_GUARDIAN)
                } else {
                    this._steps.push(WizardStep.ADD_ASSET)
                }
                break
            case WizardStep.CHILDREN_GUARDIAN:
                this._steps.push(WizardStep.ADD_ASSET)
                break
            case WizardStep.ADD_ASSET:
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

    get principal() { return this.findOnePersonByRole(EleosRole.principal) as EleosPrincipal}

    get marritalStatus() { return this._marritalStatus}

    get title() { return this._marritalStatus === EleosMaritalStatus.single ? 'I' : 'We'}

    get possessivePronouns() { return this._marritalStatus === EleosMaritalStatus.single ? 'My' : 'Our'}
    
    get spouse(): EleosPerson | undefined { return this.findOnePersonByRole(EleosRole.spouse)}

    get people() { return this._people}
    
    get childrenStatus(): EleosChildrenStatusValue | undefined { return this._childrenStatus}

    set childrenStatus(status: EleosChildrenStatusValue) { this._childrenStatus = status}

    get children() {return  this.findPeopleByRole(EleosRole.child) as EleosChild[]  }

    get minors(): EleosChild[] {
        return this.children.filter(c => c.isMinor) as EleosChild[]
    }
    
    get guardians() { return this.findPeopleByRole(EleosRole.child_guardian) as EleosGuardian[]}

    get assets() { return this._assets}

    deleteOnePersonByRole(role: EleosRole): EleosPerson | undefined {
        const foundPerson = Array.from(this._people.values()).find(p => p.roles.includes(role))
        if (foundPerson) {
            this._people.delete(foundPerson.display)
        }   
        return foundPerson
    }

    findOnePersonByRole(role: EleosRole): EleosPerson | undefined {
        return Array.from(this._people.values()).find(p => p.roles.includes(role))
    }

    
    findPeopleByRole(role: EleosRole): EleosPerson[] {
        return Array.from(this._people.values()).filter(p => p.roles.includes(role))
    }

    getPrincipalOrSpouseByName(name: string): EleosPerson | undefined {
        if (this.principal && this.principal.display === name) {
            return this.principal
        }
        if (this.spouse && this.spouse.display === name) {
            return this.spouse
        }
        return undefined
    }

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

    setSpouse(spouse: EleosPerson | null, marritalStatus: EleosMaritalStatus): EleosApiResult { 
        if (!this.principal) {
            throw Error('Principal is not set')
        }

        this._marritalStatus = marritalStatus
        if (marritalStatus === EleosMaritalStatus.married && !spouse) {
            this._marritalStatus = undefined
            return {succeeded: false, error: 'Married status must have a spouse'}
        }

        // not married
        if (!spouse) {
            this.deleteOnePersonByRole(EleosRole.spouse)
            return {succeeded: true}
        }

        // not the right role
        if (!spouse.isSpouse) {
            this._marritalStatus = undefined
            return {succeeded: false, error: 'The person is not a spouse'}
        }

        // married and make sure spouse and principal are not the same
        const existingPerson = this.people.get(spouse.display)
        if (existingPerson) {
            if (existingPerson.roles.includes(EleosRole.spouse)) {
                // idemptotency
                return {succeeded: true}
            
            } else {
                return {succeeded: false, error: 'Spouse cannot have the same name as other people. Please double check your spelling or add a suffix like sr or jr'}
            }
        }

        this.people.set(spouse.display, spouse)
        return {succeeded: true}
    }

    /**
     * Remove all children from the list if the user reset the "have children" checkbox
     */
    resetChildren() {
        this.removePeople(EleosRole.child)
        this.removePeople(EleosRole.child_guardian)
    }

    removePeople(role: EleosRole) {
        for (let [key, value] of this.people) {
            if (value.roles.includes(role)) {
                this.people.delete(key);
            }
        }
    }

    checkPersonExists(person: EleosPerson): EleosPerson | undefined{
        return this.people.get(person.display)
    }

    addChildren(children: EleosChild[]): EleosApiResult  {
        children.forEach(c => {
            const existing = this.checkPersonExists(c)
            if (!existing) {
                this.people.set(c.display, c)
            } else if (existing && !existing.isChild){
                return {succeeded: false, error: `The person "${c.display}" already exists`}
            }
        })
        return {succeeded: true};
    }

    addGuardians(guardians: EleosGuardian[]): EleosApiResult {
        // need to have minors
        if (this.children.length === 0 || this.minors.length === 0) {
            return {succeeded: false, error: 'Need to have at least a minor child to have guardians'}
        }  
        
        // make sure that none of the guardian is princal himself
        guardians.forEach(g => {
            const existingPerson = this.people.get(g.display)
            if (existingPerson && (existingPerson.isPrincipal || 
                existingPerson.isSpouse || existingPerson.isChild)) {                     
                return {succeeded: false, error: 'Guardian cannot be the principal or the spouse'}
            } else {
                this.people.set(g.display, g)
            }
        })
      
        return {succeeded: true};
    }

    /**
     * Add a new asset to include in the will
     * 
     * @param asset 
     * @returns 
     */
    addEleosAsset(asset: EleosAsset): EleosApiResult {
        if (!this.principal) {
            throw Error('Principal is not set')
        }

        // must have a uqniue name
        if (this._assets.find(a => a.name === asset.name)) {
            return {succeeded: false, error: 'The asset with the name already added! Make sure to use a different name if the assets are different.'}
        }

        // cannot add the same asset twice
        if ( this._assets.find(a => a.isEquals(asset))) {
            return {succeeded: false, error: 'The asset with the same attributes is already added! Make sure to write a different note to distingush two assets.'}
        }

        // must have owner if ownership is SEPERATE Property
        if (asset.ownership === EleosAssetOwnerShipType.separate && !asset.owner) {
            return { succeeded: false, error: 'Separate ownership must specify the owner' }
        }

        // must not have owner if ownership is not individual
        if (asset.ownership !== EleosAssetOwnerShipType.separate && asset.owner) {
            return { succeeded: false, error: 'Thid ownership type must not have owner' }
        }

        // owner must be either be principal or spouse
        if (asset.ownership === EleosAssetOwnerShipType.separate) {
            if (!this.spouse) {
                return { succeeded: false, error: 'The ownership must have spouse as owner'}
            }
            if (!asset.owner) {
                return { succeeded: false, error: 'The ownership must have owner'}
            }
        
            if (this.principal !== asset.owner && this.spouse !== asset.owner) {
                return { succeeded: false, error: 'The owner must be either the principal or the spouse'} 
            }
        }

        this._assets.push(asset)
        return {succeeded: true}
    }
}

export default Eleos

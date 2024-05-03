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
import ElesoPersonWithRoles 
                from "./ElesoPersonWithRoles"
import { EleosAsset } 
                from "./EleosAsset"
import { EleosAssetOwnerShipTypeId } 
                from "./EleosDataTypes"

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
    private _assets: EleosAsset[] = []
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

    get principal() { return this._principal}

    get spouse(): EleosPerson | null { return this._spouse}

    get people() { return this._people}
    
    get children() {return  this._children  }

    get minors(): EleosChild[] {
        return this._children.filter(c => c.isMinor)
    }

    get guardians() { return this._guardians}

    get assets() { return this._assets}

    getPrincipalOrSpouseByName(name: string): EleosPerson | undefined {
        if (this._principal && this._principal.display === name) {
            return this._principal
        }
        if (this._spouse && this._spouse.display === name) {
            return this._spouse
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

    setSpouse(spouse: EleosPerson | null): EleosApiResult { 
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

    addChildren(children: EleosChild[]): EleosApiResult  {
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

    addGuardians(guardians: EleosGuardian[]): EleosApiResult {
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

    /**
     * Add a new asset to include in the will
     * 
     * @param asset 
     * @returns 
     */
    addEleosAsset(asset: EleosAsset): EleosApiResult {
        if (!this._principal) {
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

        // must have owner if ownership is individual
        if (asset.ownership.id === EleosAssetOwnerShipTypeId.separately && !asset.owner) {
            return { succeeded: false, error: 'Individual ownership must specify the owner' }
        }

        // must not have owner if ownership is not individual
        if (asset.ownership.id !== EleosAssetOwnerShipTypeId.separately && asset.owner) {
            return { succeeded: false, error: 'Thid ownership type must not have owner' }
        }

        // owner must be either be principal or spouse
        if (asset.ownership.id === EleosAssetOwnerShipTypeId.separately) {
            if (!this._spouse) {
                return { succeeded: false, error: 'The ownership must have spouse as owner'}
            }
            if (!asset.owner) {
                return { succeeded: false, error: 'The ownership must have owner'}
            }
        
            if (!EleosPerson.equealTo(this._principal, asset.owner) && 
                !EleosPerson.equealTo(this._spouse, asset.owner)) {
                return { succeeded: false, error: 'The ownership must have principal or spouse as owner'} 
            }
        }

        this._assets.push(asset)
        return {succeeded: true}
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

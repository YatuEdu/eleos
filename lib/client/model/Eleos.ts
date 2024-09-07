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
import {  EleosAssetDistributionGrandScheme, EleosMaritalStatus, } 
                from "./EleosDataTypes"
import { EleosChildrenStatusValue } 
                from "./EleosChildrenStatus"
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType"
import { EleosAssetType } 
                from "./EleosAssetType"
import EleosRole, { EleosRoleId } 
                from "./EleosRole"
import EleosSpouse from 
                "./EleosSpouse"
import { AssetDistributionMethod, AssetDistributionTiming } 
                from "./AssetDistribution"
import EleosEexecutor from "./EleosEexcutor"
import EmailOrPhone from "./EmailOrPhone"


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
    private _allChildrenIncluded: boolean = false
    private _assetDistributionGrandScheme: EleosAssetDistributionGrandScheme | undefined = undefined
    private _assetDistributionMethods: Map<AssetDistributionTiming, AssetDistributionMethod> = new Map()
    private _steps: number[] = []

    init(firstName: string, middleName: string, lastName: string, suffix: string, emailOrPhone: EmailOrPhone, state: EleosState) {
        const newPrincipal = EleosPrincipal.create(firstName, middleName, lastName, suffix, emailOrPhone, state)

        //console.log('Principal created', newPrincipal)
        const principalOld = this.findOnePersonByRole(EleosRoleId.principal) as EleosPrincipal
        let addNew = true
        if (principalOld) {
            if (principalOld.signature !== newPrincipal.signature) {
                const result = this.updateRole(principalOld, newPrincipal)
                if (result.succeeded === false) {
                    return result
                }
                    
                console.log('Principal already exists, update the principal', principalOld, newPrincipal)
            } else {
                addNew = false
            }
        } 

        if (addNew) {
            this._people.set(newPrincipal.display, newPrincipal.person)
            console.log('Principal added or updated', newPrincipal)
        }
            
        // wizard move to the BASIC_INFO step
        this._steps.push(WizardStep.BASIC_INFO)
        return {succeeded: true}
    }

    /**
     * A common scenario is that the user may want to update it's role related info such as email, address, etc.
     * 
     * @param oldRole 
     * @param newRole 
     * @returns 
     */
    updateRole<T extends EleosRole>(oldRole: T, newRole: T): EleosApiResult {
        const existingPerson = this._people.get(newRole.person.display)
        if (existingPerson) {
            return {succeeded: false, error: `The person with the same name [${existingPerson.relationship} ${existingPerson.display}] already exists. Please make sure to check your name spelling.`}
        }
        const oldKey = oldRole.display
        oldRole.updateRole(newRole)

        // person key changed? (this happens if a person's name is updated)
        if (oldKey !== newRole.display) {
            this._people.delete(oldKey)
            this._people.set(newRole.display, oldRole.person)
        }
        return {succeeded: true}
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
                    this._steps.push(WizardStep.ADD_EXECUTOR)
                }
                break
            case WizardStep.CHILDREN_GUARDIAN:
                this._steps.push(WizardStep.ADD_EXECUTOR)
                break
            case WizardStep.ADD_EXECUTOR:
                    this._steps.push(WizardStep.ADD_ASSET)
                    break
            case WizardStep.ADD_ASSET:
                if (this.assetsNeedDistribution.length > 0) {
                    if (this.assetsSurvidedByPrincipal.length > 0) {
                        this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES)
                    } else if (this.assetsSurvidedBySpouse.length > 0) {
                        this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES)
                    } else {
                        this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO)
                    }
                } else {
                    this._steps.push(WizardStep.WILL_SUMMARY)
                }
                break
            case WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_PRINCIPAL_GOES:
                if (this.assetsSurvidedBySpouse.length > 0) {
                    this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES)
                } else if (this._marritalStatus === EleosMaritalStatus.married) {
                    this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO)
                } else {
                    this._steps.push(WizardStep.WILL_SUMMARY)
                }
                break
            case WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_SPOUSE_GOES:
                this._steps.push(WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO)
                break
            case WizardStep.ASSET_DISTRIBUTION_QUESTIONS_WHEN_BOTH_GO:
                this._steps.push(WizardStep.WILL_SUMMARY)
                break
            case WizardStep.WILL_SUMMARY:
                this._steps.push(WizardStep.PAYMENT)
                break
            case WizardStep.PAYMENT:
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

    get helpText() { return this._helpText}

    get assetDistributionGrandScheme(): EleosAssetDistributionGrandScheme | undefined {
        if (this._marritalStatus !== EleosMaritalStatus.married && this._childrenStatus === EleosChildrenStatusValue.hasNoChildren) {
            this._assetDistributionGrandScheme = EleosAssetDistributionGrandScheme.complex
        }
        return this._assetDistributionGrandScheme
    }

    set assetDistributionGrandScheme(scheme: EleosAssetDistributionGrandScheme) { this._assetDistributionGrandScheme = scheme}

    get principal() { return this.findOnePersonByRole(EleosRoleId.principal) as EleosPrincipal}

    get marritalStatus(): EleosMaritalStatus | undefined { return this._marritalStatus}

    set marritalStatus(status: EleosMaritalStatus) { this._marritalStatus = status} 

    get title() { return this._marritalStatus === EleosMaritalStatus.single ? 'I' : 'We'}

    get possessivePronouns() { return this._marritalStatus === EleosMaritalStatus.single ? 'My' : 'Our'}

    get they() { 
        const prince = this.principal
        const spouse = this.spouse
        if (prince) {
            return `${prince.display}` + (spouse ? ` and ${spouse}`: '')
        }
        throw new Error('No principal found')
    }

    get spouse(): EleosSpouse | undefined { 
        const role = this.findOnePersonByRole(EleosRoleId.spouse)
        return role ? role as EleosSpouse : undefined
    }
    
    get childrenStatus(): EleosChildrenStatusValue | undefined { return this._childrenStatus}

    set childrenStatus(status: EleosChildrenStatusValue) { this._childrenStatus = status}

    get children() {return this.findPeopleByRole(EleosRoleId.child)}

    get childrenNames() { return this.children.map(c => c.display)}

    get allChildrenIncluded() { return this._allChildrenIncluded}

    set allChildrenIncluded(allIncluded: boolean) { this._allChildrenIncluded = allIncluded}


    get executors(): EleosEexecutor[] { return this.findPeopleByRole(EleosRoleId.executor) as EleosEexecutor[]}

    /**
     * get a list a principal's children who are not minors and potential guardians
     */
    get potentialGuardians(): EleosChild[] {
        return Array.from(this._people.values()).filter(p => {
            const child = p.getRole(EleosRoleId.child) as EleosChild
            if (child) {
                return child.isMinor === false && !p.isGuardian
            } else {
                return false 
            }
        }).map(p => p .getRole(EleosRoleId.child) as EleosChild)
    }

    get adultChildren(): EleosChild[] {
        return this.children.filter(c => !((c as EleosChild).isMinor)) as  EleosChild[]
    }

    get minors(): EleosChild[] {
        return this.children.filter(c => (c as EleosChild).isMinor) as  EleosChild[]
    }
    
    get guardians(): EleosGuardian[] { 
        return this.findPeopleByRole(EleosRoleId.child_guardian) as EleosGuardian[]
    }

    get assets() { return this._assets}

    getAssetDistributionMethod(timing: AssetDistributionTiming) : AssetDistributionMethod | undefined{
        return this._assetDistributionMethods.get(timing)
    }

    setAssetDistributionMethod(timing: AssetDistributionTiming, method: AssetDistributionMethod): AssetDistributionMethod | undefined {
        const existingMethod = this._assetDistributionMethods.get(timing)
        let addNew = true
        if (existingMethod) {
            if (existingMethod !== method) {
                // method already exists, update the method
                this._assetDistributionMethods.delete(timing)
                console.log('Method already exists, update the method', existingMethod, method)
            } else {
                addNew = false
            }
        } 
        
        if (addNew) {
            this._assetDistributionMethods.set(timing, method)
        } 

        return existingMethod
    }

    /**
     * The following assets that need to be distributed if the principal or spouse id deceased
     */
    get assetsNeedDistribution() {
        return this._assets.filter(asset => 
            asset.type !== EleosAssetType.lifeInsurance && 
            asset.ownership !== EleosAssetOwnerShipType.trust
           )
        }

    /**
     * The following assets are the assets that need to be distributed if the spouse is deceased
     */
    get assetsSurvidedBySpouse() { 
        return this.assetsNeedDistribution
                    .filter(a => a.ownership === EleosAssetOwnerShipType.joint || 
                           (a.ownership === EleosAssetOwnerShipType.prenuptial && a.spousePercentage ? a.spousePercentage > 0 : false) ||
                           (a.ownership === EleosAssetOwnerShipType.separate && a.owner === this.spouse))
    }  

    /**
     * The following assets are the assets that need to be distributed if the principal is deceased
     */
    get assetsSurvidedByPrincipal() { 
        return this.assetsNeedDistribution
                    .filter(a => a.ownership === EleosAssetOwnerShipType.joint ||
                           (a.ownership === EleosAssetOwnerShipType.prenuptial && a.principalPercentage ? a.principalPercentage > 0 : false) ||
                           (a.ownership === EleosAssetOwnerShipType.separate && a.owner === this.principal) ||
                           (a.ownership === EleosAssetOwnerShipType.individualForSingle))
    }
    
    deleteOnePersonByRole(role: EleosRoleId): EleosPerson | undefined {
        const foundPerson = Array.from(this._people.values()).find(p => p.hasRole(role))
        if (foundPerson) {
            this._people.delete(foundPerson.display)
        }   
        return foundPerson
    }

    findOnePersonByRole(role: EleosRoleId): EleosRole | undefined {
        const person = Array.from(this._people.values()).find(p => p.hasRole(role))
        return person?.getRole(role)
    }

    
    findPeopleByRole(role: EleosRoleId): EleosRole[] {
        // console.log('findPeopleByRole', Array.from(this._people.values()))
        // @ts-ignore
        return Array.from(this._people.values())
                .filter(p => p.hasRole(role))
                .map(p => p.getRole(role))
    }

    getPrincipalOrSpouseByName(name: string): EleosRole | undefined {
        const principal = this.principal
        const spouse = this.spouse
        if (principal && principal.display === name) {
            return principal
        }
        if (spouse && spouse.display === name) {
            return spouse
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

    removeSpouse() {
        this.deleteOnePersonByRole(EleosRoleId.spouse)
        return {succeeded: true}
    }

    /**
     * This is called at the end of the wizard to correct a mistake in the spouse name
     * 
     * @param firstName 
     * @param middleName 
     * @param lastName 
     * @param suffix 
     * @param marritalStatus 
     * @returns 
     */
    updateSpouse(firstName: string, middleName: string, lastName: string, suffix: string, marritalStatus: EleosMaritalStatus): EleosApiResult { 
        if (!this.principal) {
            throw Error('Principal is not set')
        }
        const newSpouse = EleosSpouse.create(firstName, middleName, lastName, suffix)
        const spouseOld = this.findOnePersonByRole(EleosRoleId.spouse) as EleosSpouse
        if (spouseOld) {
            if (spouseOld.display !== newSpouse.display) {
                const result = this.updateRole(spouseOld, newSpouse)
                if (result.succeeded === false) {
                    return result
                }
                console.log('Spouse already exists, update the spouse name in case was spelled wrong')
            }

            // same spouse name, no need to update, idempotent operation
            return {succeeded: true}
        }
        throw Error('Spouse not found')
    }

    /**
     * Add a new spouse to the will and at this time the user must have a principal and no spouse
     * 
     * @param firstName 
     * @param middleName 
     * @param lastName 
     * @param suffix 
     * @param marritalStatus 
     * @returns 
     */
    addSpouse(firstName: string, middleName: string, lastName: string, suffix: string, marritalStatus: EleosMaritalStatus): EleosApiResult { 
        if (!this.principal) {
            throw Error('Principal is not set')
        }
        this._marritalStatus = marritalStatus
        const newSpouse = EleosSpouse.create(firstName, middleName, lastName, suffix)
        const spouseOld = this.findOnePersonByRole(EleosRoleId.spouse)
        if (spouseOld) {
           throw Error('Spouse already exists')
        }

        const existingPerson = this._people.get(newSpouse.display)

        // married and make sure spouse and principal are not the same
        if (existingPerson) {
            return {succeeded: false, error: 'Spouse cannot have the same name as other people. Please double check your spelling'}
        }

        this._people.set(newSpouse.display, newSpouse.person)
        return {succeeded: true}
    }

    /**
     * Remove all children from the list if the user reset the "have children" checkbox
     */
    resetChildren() {
        /*
        this.removePeople(EleosRoleId.child)
        this.removePeople(EleosRoleId.child_guardian)
        */
    }

    /**
     * Remove people from this will, should not be used to remove principal or spouse or children
     * @param role 
     */
    removePeople(role: EleosRoleId) {
        for (let [key, value] of this._people) {
            if (value.hasRole(role)) {
                this._people.delete(key);
            }
        }
    }

    checkPersonExists(name: string): EleosPerson | undefined {
        return this._people.get(name)
    }

    /**
     * First time adding children to the will
     * 
     * @param children 
     * @returns 
     */
    addChildren(children: EleosChild[]): EleosApiResult  {
        // 1) check duplicated names
       const existing = children.find(c => this.checkPersonExists(c.person.display))
       if (existing) {
            return {succeeded: false, error: `The person with the same name [${existing.person.relationship} ${existing.display}] already exists. Please make sure to check your name spelling.`}
        }

        // 2) add children one by one
        let id = 1
        children.forEach(c => {
            c.childId = id++
            this._people.set(c.display, c.person)
        })
        return {succeeded: true};
    }

    /**
     * visit the children wizard again to update the children for spelling error or missing children.
     * cannot remove children from the list
     * @param children 
     */
    updateChildren(children: EleosChild[]): EleosApiResult  {
        const childrenExisting = this.children as EleosChild[]
        if (childrenExisting.length === 0) {
            return {succeeded: false, error: 'No children found to update'}
        }

        if (childrenExisting.length > children.length) {
            return {succeeded: false, error: 'Children cannot be removed.'}
        }

        // updatre children one by one
        childrenExisting.forEach((ec, i) => {
            const newChildIndex = children.findIndex(ch => ch.childId === ec.childId)
            if (newChildIndex > -1) {
                const newChild = children[newChildIndex]
                if (newChild.signature !== ec.signature) {
                    const result = this.updateRole(ec, newChild)
                    if (result.succeeded === false) {
                        return result
                    }
                }
                // remove the existing child
                children.splice(newChildIndex, 1)
            }
        })

        // new children found, add them
        let id = childrenExisting.length + 1
        children.forEach(c => {
            this._people.set(c.display, c.person)
            c.childId = id++
            console.log('added new child name in case was missed before', c.display)
        })

        return {succeeded: true};
    }

    addGuardians(guardians: EleosGuardian[]): EleosApiResult {
        // need to have minors
        if (this.children.length === 0 || this.minors.length === 0) {
            return {succeeded: false, error: 'Need to have at least a minor child to have guardians'}
        }  
        
        // make sure that none of the guardian is principal or spouse himself
        guardians.forEach(g => {
            const existingPerson = this._people.get(g.person.display)
            if (existingPerson) {
                if (!existingPerson.isGuardian) {
                    if (existingPerson.isPrincipal || existingPerson.isSpouse) {                     
                        return {succeeded: false, error: 'Guardian cannot be the principal or the spouse'}
                    } else if (existingPerson.isChild && (existingPerson.getRole(EleosRoleId.child) as EleosChild).isMinor) {
                        return {succeeded: false, error: 'Guardian cannot be minors'}
                    } else {
                        existingPerson.emailOrPhone = g.emailOrPhone // important !!!
                        existingPerson.addRole(g)
                    }
                } else {
                    // update the existing guardian
                    if (existingPerson.getRole(EleosRoleId.child_guardian).signature !== g.signature) {
                        (existingPerson.getRole(EleosRoleId.child_guardian) as EleosGuardian).updateRole(g)
                    }
                }
            } else {
                if (!(g instanceof EleosGuardian)) {
                    return {succeeded: false, error: 'Guardian instance expexcted'}
                }
                this._people.set(g.display, g.person)
            }
        })
      
        return {succeeded: true};
    }

    addEexutors(executors: EleosEexecutor[]): EleosApiResult {
        // make sure that none of the benificiaries is principal or spouse himself
        executors.forEach(ex => {
            const existingPerson = this._people.get(ex.display)
            if (existingPerson) {
                if (!existingPerson.isExecutor) {
                    if (existingPerson.isPrincipal || existingPerson.isSpouse) {                     
                        return {succeeded: false, error: 'Eexcutors cannot be the existing principals or spouse of the wll'}
                    } else if (existingPerson.isChildAndMinor) {
                        return {succeeded: false, error: 'Eexcutors cannot be minors'}
                    } else {
                        existingPerson.addRole(ex)
                    }
                }
            } else {
                if (!(ex instanceof EleosEexecutor)) {
                    return {succeeded: false, error: 'Executor instance expexcted'}
                }
                this._people.set(ex.display, ex.person)

                // change children status to hasChildren if executor is a child, 
                // this can happen if thw user has not reached the children step yet
                if (ex.person.isChild) {
                    this._childrenStatus = EleosChildrenStatusValue.hasChildren
                }
            }
        })
      
        return {succeeded: true};
    }

    addOtherBenificiaries(benificiaries: EleosRole[]): EleosApiResult {
        // make sure that none of the benificiaries is principal or spouse himself
        benificiaries.forEach(b => {
            const existingPerson = this._people.get(b.display)
            if (existingPerson) {
                if (!existingPerson.isOtherBenificiary) {
                    if (existingPerson.isPrincipal || existingPerson.isSpouse || existingPerson.isChild) {                     
                        return {succeeded: false, error: 'Benificiaries cannot be the existing subjects of the will'}
                    } else {
                        existingPerson.addRole(b)
                    }
                }
            } else {
                if (!(b instanceof EleosRole)) {
                    return {succeeded: false, error: 'Benificiaries instance expexcted'}
                }
                this._people.set(b.display, b.person)
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
        const principal = this.principal
        if (!principal) {
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
        const spouse = this.spouse
        if (asset.ownership === EleosAssetOwnerShipType.separate) {
            if (!spouse) {
                return { succeeded: false, error: 'The ownership must have spouse as owner'}
            }
            if (!asset.owner) {
                return { succeeded: false, error: 'The ownership must have owner'}
            }
        
            if (principal !== asset.owner && spouse !== asset.owner) {
                return { succeeded: false, error: 'The owner must be either the principal or the spouse'} 
            }
        }

        this._assets.push(asset)
        return {succeeded: true}
    }

    /**
     * Delet an existing asset in the will
     * 
     * @param asset 
     * @returns 
     */
    deleteEleosAsset(assetName: String): EleosApiResult {
        const index = this._assets.findIndex(a => a.name === assetName)
        if (index > -1) {
            this._assets.splice(index, 1)
            return {succeeded: true}
        }
        return {succeeded: false, error: 'The asset not found'}
    }

}

export default Eleos

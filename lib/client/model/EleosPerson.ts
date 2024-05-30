import { normalizeName } 
                from '@/lib/common/utilities/StringUtil'
import EleosEntity  
                from './EleosEntity'
import { EleosRelationshipType } 
                from './EleosRelationshipType'
import EleosRole, { EleosRoleId } 
                from './EleosRole'
import { EmailOrPhone, } 
                from './EleosDataTypes'

interface IEleosRoleMap {
    [roleId: string]: EleosRole
}

class EleosPerson extends EleosEntity {
    private _firstName: string
    private _middleName: string
    private _lastName: string
    private _suffix: string
    private _relationship: EleosRelationshipType
    private _emailOrPhone: EmailOrPhone | undefined = undefined
    private _roles: IEleosRoleMap = {}

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                relationship: EleosRelationshipType) {
        super()
        this._firstName = normalizeName(firstName)
        this._middleName = middleName ? normalizeName(middleName) : ''
        this._lastName = normalizeName(lastName)
        this._suffix = suffix ? normalizeName(suffix) : ''
        this._relationship = relationship
    }

    /**
     * check if the person has a role
     */
    hasRole(roleId: EleosRoleId): boolean {
        return this._roles[roleId] !== undefined
    }

     /**
     * get the role
     */
    getRole(roleId: EleosRoleId) {
        return this._roles[roleId]
    }

    /**
     * getters
     */

    get firstName() { return this._firstName }

    get middleName() { return this._middleName }

    get lastName() { return this._lastName }

    get suffix() { return this._suffix }

    get relationship() { return this._relationship }
    
    get roles() { return this._roles }  

    get emailOrPhone(): EmailOrPhone | undefined { return this._emailOrPhone }

    set emailOrPhone(emailOrPhone: EmailOrPhone|undefined) { this._emailOrPhone = emailOrPhone }

    get isPrincipal() { 
        if (this._roles[EleosRoleId.principal] !== undefined) {
            if (Object.keys(this._roles).length > 1 ) {
                throw Error('Principal cannot have other roles')
            }
            return true
        }

        return false
    }

    get isSpouse() { 
        if (this._roles[EleosRoleId.spouse] !== undefined) {
            if (Object.keys(this._roles).length > 1 ) {
                throw Error('Spouse cannot have other roles')
            }
            return true
        }

        return false
    }

    get isChild() {
        return this._roles[EleosRoleId.child] !== undefined
    }

    get isExSpouse() {
        return this._roles[EleosRoleId.exSpouse] !== undefined
    }

    get isExecutor() {
        return this._roles[EleosRoleId.executor] !== undefined
    }

    get isGuardian() {
        return this._roles[EleosRoleId.child_guardian] !== undefined
    }

    get isOtherBenificiary() {
        return this._roles[EleosRoleId.other_benificiary] !== undefined
    }

    get display(): string {
        return `${this._firstName}${this._middleName ? ' ' + this._middleName : ''} ${this._lastName}${this._suffix ? ' ' + this._suffix : ''}`
    }

    get signature(): string {
        return this.display
    } 

    get id(): string {
        return this.display
    }

    /**
     * public methods
     */
    static equealTo(a: EleosPerson, b: EleosPerson): boolean {
        return a.firstName === b.firstName && a.middleName === b.middleName && a.lastName === b.lastName && a.suffix === b.suffix
    }

    updatePerson(person: EleosPerson) {
        this._firstName = person.firstName
        this._middleName = person.middleName
        this._lastName = person.lastName
        this._suffix = person.suffix
        this._relationship = person.relationship
        //this._email = person.email
        //this._phone = person.phone
    }

    addRole(role: EleosRole) {
        if (this._roles[role.roleId] !== undefined) {
            return
        }

        // we cannot assign a role to a person since the role might point to another person
        // we need to clone the role's data and assign it to the person
        this._roles[role.roleId] = role.clone(this)
    }  
}

export default EleosPerson
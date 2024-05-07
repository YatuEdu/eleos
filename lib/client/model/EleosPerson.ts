import { normalizeName } 
                from '@/lib/common/utilities/StringUtil'
import EleosEntity  
                from './EleosEntity'
import { EleosRole } from './EleosDataTypes'
                            
class EleosPerson extends EleosEntity {
    private _firstName: string
    private _middleName: string
    private _lastName: string
    private _suffix: string
    private _roles: EleosRole[] = []

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string,
                role: EleosRole) {
        super()
        this._firstName = normalizeName(firstName)
        this._middleName = middleName ? normalizeName(middleName) : ''
        this._lastName = normalizeName(lastName)
        this._suffix = suffix ? normalizeName(suffix) : ''
        this._roles.push(role)
    }

    /**
     * getters
     */

    get firstName() { return this._firstName }

    get middleName() { return this._middleName }

    get lastName() { return this._lastName }

    get suffix() { return this._suffix }

    get roles() { return this._roles }  

    get isPrincipal() { 
        if (this._roles.includes(EleosRole.principal)) {
            if (this._roles.length > 1 ) {
                throw Error('Principal cannot have other roles')
            }
            return true
        }

        return false
    }

    get isSpouse() { 
        if (this._roles.includes(EleosRole.spouse)) {
            if (this._roles.length > 1 ) {
                throw Error('Spouse cannot have other roles')
            }
            return true
        }

        return false
    }

    get isChild() {
        return this._roles.includes(EleosRole.child)
    }

    get isExSpouse() {
        return this._roles.includes(EleosRole.exSpouse)
    }

    get isExecutor() {
        return this._roles.includes(EleosRole.executor)
    }

    get isGuardian() {
        return this._roles.includes(EleosRole.child_guardian)
    }

    get display(): string {
        return `${this._firstName} ${this._middleName} ${this._lastName} ${this._suffix}`
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

    addRole(role: EleosRole) {
        if (this._roles.includes(role)) {
            return
        }

        this._roles.push(role)
    }  

}

export default EleosPerson
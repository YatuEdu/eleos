import { normalizeName } 
                from '@/lib/common/utilities/StringUtil'
import EleosEntity  
                from './EleosEntity'
                            
class EleosPerson extends EleosEntity {
    private _firstName: string
    private _middleName: string
    private _lastName: string
    private _suffix: string

    constructor(firstName: string, 
                middleName: string,
                lastName: string,
                suffix: string) {
        super()
        this._firstName = normalizeName(firstName)
        this._middleName = middleName ? normalizeName(middleName) : ''
        this._lastName = normalizeName(lastName)
        this._suffix = suffix ? normalizeName(suffix) : ''
    }

    /**
     * getters
     */

    get firstName() { return this._firstName }

    get middleName() { return this._middleName }

    get lastName() { return this._lastName }

    get suffix() { return this._suffix }

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

}

export default EleosPerson
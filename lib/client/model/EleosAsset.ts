import EleosPerson 
                from "./EleosPerson";
import EleosEntity 
                from "./EleosEntity";
import { EleosAssetType} 
                from "./EleosAssetType";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";

export class EleosAsset extends EleosEntity {
    protected _name: string;
    protected _type: EleosAssetType;
    protected _ownership: EleosAssetOwnerShipType;
    protected _owner?: EleosPerson;
    protected _location?: string;
    protected _note?: string;

    constructor(name: string, 
                location: string, 
                note: string, 
                type: EleosAssetType, 
                ownership: EleosAssetOwnerShipType, 
                owner?: EleosPerson) {
        super()
        this._name = name
        this._type = type
        this._ownership = ownership
        this._owner = owner
        this._location = location
        this._note = note
    }

    /**
     * public methods
     */
    isEquals(asset: EleosAsset): boolean {
        return this._location === asset._location && 
               this._type === asset._type &&
               this._note === asset._note &&
               this._ownership === asset._ownership
    }

    get id(): string {
        return this._name
    }

    get display(): string {
        if (this._type === EleosAssetType.realEstate) {
            return `The property '${this._name}' ${this._location ? `located at ${this._location}` : ''}`
        }

        if (this._type === EleosAssetType.bankAccount) {
            return `The bank account '${this._name}' ${this._location ? `in ${this._location}` : ''}`
        }

        return `The ${this._type} '${this._name}' ${this._location ? `located at ${this._location}` : ''}`
     }

    /**
     * getters
     */

    get name(): string {
        return this._name;
    }

    get type(): EleosAssetType{
        return this._type;
    }

    get ownership(): EleosAssetOwnerShipType {
        return this._ownership;
    }

    get owner(): EleosPerson | undefined {
        return this._owner;
    }

    get location(): string | undefined {
        return this._location;
    }

    get note(): string | undefined {
        return this._note;
    }
}
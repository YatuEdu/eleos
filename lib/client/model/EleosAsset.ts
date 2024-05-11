import { EleosApiResult } 
                from "./EleosMisc";
import EleosPerson 
                from "./EleosPerson";
import EleosEntity 
                from "./EleosEntity";
import { EleosPropertyType } 
                from "./EleosPropertyType";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";

export class EleosAsset extends EleosEntity {
    private _name: string;
    private _type: EleosPropertyType;
    private _ownership: EleosAssetOwnerShipType;
    private _owner?: EleosPerson;
    private _location?: string;
    private _note?: string;

    constructor(name: string, 
                location: string, 
                note: string, 
                type: EleosPropertyType, 
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
        return `${this._name}: type=${this._type} 
                ownership=${this._ownership} 
                owner=${this._owner?.display} 
                location=${this._location} 
                note=${this._note}`
     }

    /**
     * getters
     */

    get name(): string {
        return this._name;
    }

    get type(): EleosPropertyType {
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
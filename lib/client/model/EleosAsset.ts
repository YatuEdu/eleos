import EleosEntity 
                from "./EleosEntity";
import { EleosAssetType} 
                from "./EleosAssetType";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";
import AssetDistribution, { AssetDistributionTiming } 
                from "./AssetDistribution";

export class EleosAsset extends EleosEntity {
    protected _name: string;
    protected _type: EleosAssetType;
    protected _ownership: EleosAssetOwnerShipType;
    protected _principalPercentage
    protected _owner?: string;
    protected _location?: string;
    protected _note?: string;
    protected _assetDistribution: Map<AssetDistributionTiming, AssetDistribution> = new Map() 

    constructor(name: string, 
                location: string, 
                note: string, 
                type: EleosAssetType, 
                ownership: EleosAssetOwnerShipType,
                principalPercentage?: number,
                owner?: string) {
        super()
        this._name = name
        this._type = type
        this._ownership = ownership
        this._owner = owner
        this._principalPercentage = principalPercentage
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

    distribut(timing: AssetDistributionTiming, distribute: AssetDistribution) {
        this._assetDistribution.delete(timing)
        this._assetDistribution.set(timing, distribute)
    }

    getDistributionForTiming(timing: AssetDistributionTiming): AssetDistribution | undefined {
        return this._assetDistribution.get(timing)
    }

    /**
     * getters
     */

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

    totalShareForTiming(timing: AssetDistributionTiming): number {
        let totalShare = 100
        if (this.ownership ===  EleosAssetOwnerShipType.joint) {
           if (timing === AssetDistributionTiming.principalDiceased) {
                totalShare = this._principalPercentage ? this._principalPercentage : 50
           } else if (timing === AssetDistributionTiming.spouseDeceased) {
                totalShare = this.spousePercentage ? this.spousePercentage : 50
           } else {
            totalShare = 100
           }
        }
        return totalShare
    }

    get principalPercentage() : number | undefined {
        return this._principalPercentage
    }

    get spousePercentage() : number | undefined {
        return this._principalPercentage ? 100 - this._principalPercentage : undefined
    }

    get owner(): string | undefined {
        return this._owner;
    }

    get location(): string | undefined {
        return this._location;
    }

    get note(): string | undefined {
        return this._note;
    }
}
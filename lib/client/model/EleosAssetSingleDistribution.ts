import AssetDistribution, { AssetDistributionUnit }
                from "./AssetDistribution";
import { EleosAsset } 
                from "./EleosAsset";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";
import { EleosAssetType } from 
                "./EleosAssetType";
import EleosPerson 
                from "./EleosPerson";

class EleosAssetSingleDistribution extends EleosAsset {
    protected distribution: AssetDistribution

    constructor(name: string, 
        location: string, 
        note: string, 
        type: EleosAssetType, 
        ownership: EleosAssetOwnerShipType, 
        owner?: EleosPerson) {
            super(name, location, note, type, ownership, owner)
        this.distribution = new AssetDistribution()
    }

    survivedBy(person: EleosPerson): boolean{
        return this.owner === person ? true : false;
    }

    totalPercentage(): number {
        return this.distribution.totalPercentage();
    }   

    changeDistribution(person: EleosPerson, percentage: number): void {
        this.distribution.changeDistribution(person, percentage)
    }

    addDistribution(person: EleosPerson, percentage: number): void {
       this.distribution.addDistribution(person, percentage)
    }   

    removeDistribution(person: EleosPerson): void {
        this.distribution.removeDistribution(person)
    }

    getDistribution(person: EleosPerson): number {
        return this.distribution.getDistribution(person)
    }

    get distributionsList(): AssetDistributionUnit[] {
        return this.distribution.distributionsList
    }
}

export default EleosAssetSingleDistribution
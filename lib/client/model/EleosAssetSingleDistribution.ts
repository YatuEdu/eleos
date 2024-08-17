import AssetDistribution
                from "./AssetDistribution";
import { EleosAsset } 
                from "./EleosAsset";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";
import { EleosAssetType } from 
                "./EleosAssetType";
import EleosPerson 
                from "./EleosPerson";
import EleosPrincipal from "./EleosPrincipal";
import EleosSpouse from "./EleosSpouse";

class EleosAssetSingleDistribution extends EleosAsset {
    protected distribution: AssetDistribution

    constructor(name: string, 
        location: string, 
        note: string, 
        type: EleosAssetType, 
        ownership: EleosAssetOwnerShipType, 
        owner?: EleosPrincipal | EleosSpouse,
        totalValue?: number) {
            super(name, location, note, type, ownership,100, owner, totalValue)
        this.distribution = new AssetDistribution()
    }

    survivedBy(person: EleosPerson): boolean{
        return this.owner?.person === person ? true : false;
    }

    totalPercentage(): number {
        return this.distribution.totalPercentage;
    }   

    changeDistribution(person: EleosPerson, percentage: number): void {
        this.distribution.changeDistribution(person.display, percentage)
    }

    addDistribution(person: EleosPerson, percentage: number): void {
       this.distribution.addDistribution(person.display, percentage)
    }   

    removeDistribution(person: EleosPerson): void {
        this.distribution.removeDistribution(person.display)
    }

    getDistribution(person: EleosPerson): number {
        return this.distribution.getDistribution(person.display) || 0
    }

    //get distributionsList(): AssetDistributionUnit[] {
    //    return this.distribution.distributionsList
    //}
}

export default EleosAssetSingleDistribution
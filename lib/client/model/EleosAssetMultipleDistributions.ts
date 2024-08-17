import AssetDistribution
                from "./AssetDistribution";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";
import EleosAssetSingleDistribution 
                from "./EleosAssetSingleDistribution";
import { EleosAssetType} from 
                "./EleosAssetType";
import EleosPerson 
                from "./EleosPerson";
import EleosPrincipal 
                from "./EleosPrincipal";
import EleosSpouse 
                from "./EleosSpouse";

class EleosAssetMultipleDistributions extends EleosAssetSingleDistribution {
    private _distributionWhenPricipalDie: AssetDistribution
    private _distributionWhenSpouseDie: AssetDistribution

    constructor(name: string, 
        location: string, 
        note: string, 
        type: EleosAssetType, 
        ownership: EleosAssetOwnerShipType, 
        owner?: EleosPrincipal | EleosSpouse,
        totalValue?: number) {
            super(name, location, note, type, ownership, owner)
            this._distributionWhenPricipalDie = new AssetDistribution()
            this._distributionWhenSpouseDie = new AssetDistribution()
    }

    get distributionWhenPricipalDie(): AssetDistribution {
        return this._distributionWhenPricipalDie
    }   

    get distributionWhenSpouseDie(): AssetDistribution {
        return this._distributionWhenSpouseDie
    }  
}

export default EleosAssetMultipleDistributions

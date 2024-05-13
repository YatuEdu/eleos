import { EleosAsset } 
                from "./EleosAsset";
import { EleosAssetOwnerShipType } 
                from "./EleosAssetOwnerShipType";
import { EleosAssetType } from 
                "./EleosAssetType";
import EleosPerson 
                from "./EleosPerson";

class EleosAssetNoDistribution extends EleosAsset{
    
    constructor(name: string, 
        location: string, 
        note: string, 
        type: EleosAssetType, 
        ownership: EleosAssetOwnerShipType, 
        owner?: EleosPerson) {
            super(name, location, note, type, ownership, owner)
    }

}

export default EleosAssetNoDistribution
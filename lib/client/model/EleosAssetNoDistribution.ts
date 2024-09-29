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

class EleosAssetNoDistribution extends EleosAsset{
    
    constructor(name: string, 
        location: string, 
        note: string, 
        type: EleosAssetType, 
        ownership: EleosAssetOwnerShipType, 
        owner?: EleosPrincipal | EleosSpouse) {
            super(name, location, note, type, ownership, 100, owner)
    }

}

export default EleosAssetNoDistribution
import Eleos from 
                '@/lib/client/model/Eleos'
import { EleosAssetType} 
                from '@/lib/client/model/EleosAssetType'
import { EleosAssetOwnerShipType } 
                from '@/lib/client/model/EleosAssetOwnerShipType';
import EleosAssetSingleDistribution 
                from '@/lib/client/model/EleosAssetSingleDistribution';
import EleosPerson 
                from '@/lib/client/model/EleosPerson';
import EleosAssetMultipleDistributions 
                from '@/lib/client/model/EleosAssetMultipleDistributions';
import EleosAssetNoDistribution 
                from '@/lib/client/model/EleosAssetNoDistribution';
import { EleosAsset } 
                from '@/lib/client/model/EleosAsset';

// Import other asset classes as needed

export class EleosAssetFactory {
    private eleos: Eleos;

    constructor(eleos: Eleos) {
        this.eleos = eleos
    }

    createAsset(assetName: string, location: string, 
                note: string, assetType: EleosAssetType, 
                ownershipType: EleosAssetOwnerShipType, owner: EleosPerson): EleosAsset {
        if (this.eleos.spouse === null) {
           // easy case, single person asset
            return new EleosAssetSingleDistribution(assetName, location, note, assetType, ownershipType, owner)
        }
        
        // case for multiple distributions
        if (ownershipType !== EleosAssetOwnerShipType.prenuptial && ownershipType !== EleosAssetOwnerShipType.trust) {
            return new EleosAssetMultipleDistributions(assetName, location, note, assetType, ownershipType, owner)
        }

        // case for trust and prenuptial
        return new EleosAssetNoDistribution(assetName, location, note, assetType, ownershipType, owner)
    }
}

export default EleosAssetFactory
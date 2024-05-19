import React, { useState } 
                from 'react';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import EleosAssetDistributionUponDeceased 
                from '../functional/EleosAssetDistributionUponDeceased';

const AssetDistributionIfSpouseGoes: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || 
        !ref.current.spouse || !ref.current.children.length || !ref.current.assets)  {
        throw Error('Eleos is not initialized for this page')  
    }

    const isCommunityProperty = ref.current.principal.residenceState.isCommSate
   
    const assets = ref.current.assetsSurvidedBySpouse
    if (!assets.length) {
        throw Error('Real estate asset is not found')
    }
   
    return (
        <EleosAssetDistributionUponDeceased 
            deceased={ref.current.spouse} 
            survived={ref.current.principal} 
            assets={assets} 
            isCommunityState={isCommunityProperty}/>
    )
}

export default AssetDistributionIfSpouseGoes;

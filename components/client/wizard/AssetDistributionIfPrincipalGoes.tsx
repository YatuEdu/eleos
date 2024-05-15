import React, { useState } 
                from 'react';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import EleosAssetDistributionUponDeceased 
                from '../functional/EleosAssetDistributionUponDeceased';


const AssetDistributionIfPrincipalGoes: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || 
        !ref.current.assets)  {
        throw Error('Eleos is not initialized for this page')  
    }

    const isCommunityProperty = ref.current.principal.residenceState.isCommSate
   
    let assets = ref.current.spouse ? ref.current.assetsSurvidedByPrincipal : ref.current.assets
    if (!assets.length) {
        throw Error('Principla asset is not found')
    }
   
    return (
        <EleosAssetDistributionUponDeceased 
            deceased={ref.current.principal} 
            survived={ref.current.spouse ? ref.current.spouse : null} 
            assets={assets} 
            isCommunityState={isCommunityProperty}/>
    )
}

export default AssetDistributionIfPrincipalGoes;

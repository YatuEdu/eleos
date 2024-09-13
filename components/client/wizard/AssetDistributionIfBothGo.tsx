import React, { useState } 
                from 'react';
import EleosWizardButtonLayout 
                from '../atoms/EleosWizardButtonLayout';
import EleosButton 
                from '../atoms/EleosButton';
import { useElos } 
                from '@/lib/providers/EleosAppProvider';
import { useWizard } 
                from '@/lib/providers/WizardProvider';
import Eleos from '@/lib/client/model/Eleos';
import { EleosAssetType } from '@/lib/client/model/EleosAssetType';
import EleosAssetDistributionUponDeceased from '../functional/EleosAssetDistributionUponDeceased';
import { EleosAssetOwnerShipType } from '@/lib/client/model/EleosAssetOwnerShipType';

const AssetDistributionIfBothGoes: React.FC = () => {
    const {ref} = useElos() ?? {};
    if (!ref || !ref.current || !ref.current.principal || 
        !ref.current.spouse || !ref.current.assets)  {
        throw Error('Eleos is not initialized for this page')  
    }

    const isCommunityProperty = ref.current.principal.residenceState.isCommSate
   
    const assets = ref.current.assetsNeedDistribution

    if (!assets.length) {
        throw Error('Real estate asset is not found')
    }
   
    return (
        <EleosAssetDistributionUponDeceased
            deceased={null} 
            survived={null} 
            assets={assets} 
            isCommunityState={isCommunityProperty}/>
    )
}

export default AssetDistributionIfBothGoes

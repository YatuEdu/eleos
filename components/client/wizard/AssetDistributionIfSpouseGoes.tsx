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
import EleosPerson from '@/lib/client/model/EleosPerson';
import RadioButtonGroup from '../atoms/EleosRadioGroup';
import { AssetDistributionMethods } from '@/lib/client/model/AssetDistribution';
import AssetDistributionForm from '../functional/AssetDistributionForm';
import EleosLabel from '../atoms/EleosLabel';
import EleosAssetDistributionUponDeceased from '../functional/EleosAssetDistributionUponDeceased';

type Heir = string;

const possibleHeirs: Heir[] = ['Child 1', 'Child 2', 'Relative 1', 'Relative 2'];

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

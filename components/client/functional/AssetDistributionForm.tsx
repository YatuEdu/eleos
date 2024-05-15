import { EleosAsset } from '@/lib/client/model/EleosAsset';
import { EleosAssetOwnerShipType } from '@/lib/client/model/EleosAssetOwnerShipType';
import EleosPerson from '@/lib/client/model/EleosPerson';
import React, { useState } from 'react';
import EleosLabel from '../atoms/EleosLabel';

interface Distribution {
    [key: string]: number; // Maps heir ID to their percentage
}

interface AssetDistributionProps {
    heirs: EleosPerson[];
    asset: EleosAsset;
    onBlur: (distribution: Distribution) => void;
}

const AssetDistributionForm: React.FC<AssetDistributionProps> = ({ heirs, asset }) => {
    const totalShare = asset.ownership === EleosAssetOwnerShipType.joint ? 50 : 100
    const basicShare = Math.floor(totalShare / heirs.length);
    let remainder = totalShare %  heirs.length;
    const [distribution, setDistribution] = useState<Distribution>(() => {
        const initialDistribution: Distribution = {};
        heirs.forEach(heir => {
            initialDistribution[heir.id] = basicShare + (remainder > 0 ? 1 : 0)
            remainder--;
        });
        return initialDistribution;
    })

    const handlePercentageChange = (id: string, value: string) => {
        const percentage = parseInt(value, 10);
        if (!isNaN(percentage) && percentage >= 1 && percentage <= 100) {
            setDistribution(prev => ({
                ...prev,
                [id]: percentage
            }))
            console.log(distribution)
        }
    };

    return (
        <div>
            <EleosLabel text={`Asset distribution (%) for ${asset.type} ASSET - ${asset.name}`} />
            {heirs.map(heir => (
                <div key={heir.id} className="grid grid-cols-6 gap-0">
                    <div className="col-span-3 text-right mt-2 mr-4">
                        <EleosLabel text= {heir.display} />
                    </div>
                    <div className="col-span-3 flex float-left">
                        <input 
                            className='text-black'
                            type="number"
                            min="1"
                            max="100"
                            value={distribution[heir.id]}
                            onChange={(e) => handlePercentageChange(heir.id, e.target.value)}
                            onBlur={(e) => handlePercentageChange(heir.id, e.target.value)}
                        />
                         <span className='font-bold text-center mt-2'> %</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssetDistributionForm

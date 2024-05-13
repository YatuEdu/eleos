import React, { useState } from 'react';

type Heir = string;

const possibleHeirs: Heir[] = ['Child 1', 'Child 2', 'Relative 1', 'Relative 2'];

const AssetDistributionIfPrincipalGoes: React.FC = () => {
    const [distribution, setDistribution] = useState<string>('');
    const [heirs, setHeirs] = useState<Heir[]>([]);
    const [showAddHeirs, setShowAddHeirs] = useState<boolean>(false);

    const handleDistributionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDistribution(value);
        setShowAddHeirs(value === 'otherHeirs');
    };

    const addHeir = (heir: Heir) => {
        if (!heirs.includes(heir)) {
            setHeirs([...heirs, heir]);
        }
    };

    return (
        <div>
            <h2>If a husband is survived by his wife, how is his portion of the house distributed?</h2>
            <label>
                <input
                    type="radio"
                    value="allToWife"
                    checked={distribution === 'allToWife'}
                    onChange={handleDistributionChange}
                />
                All to wife
            </label>
            <label>
                <input
                    type="radio"
                    value="otherHeirs"
                    checked={distribution === 'otherHeirs'}
                    onChange={handleDistributionChange}
                />
                His portion goes to other heirs
            </label>

            {showAddHeirs && (
                <div>
                    <h3>Select heirs to add:</h3>
                    {possibleHeirs.map((heir) => (
                        <button key={heir} onClick={() => addHeir(heir)}>
                            + {heir}
                        </button>
                    ))}
                    {heirs.length > 0 && (
                        <div>
                            <h4>Selected Heirs:</h4>
                            <ul>
                                {heirs.map((heir, index) => (
                                    <li key={index}>{heir}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AssetDistributionIfPrincipalGoes;

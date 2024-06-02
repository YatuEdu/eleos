export enum EleosMaritalStatus {
    married = 'Married',
    single = 'Single',
    divorced = 'Divorced',
    widowed = 'Widowed',
}

export enum EleosAssetDistributionGrandScheme {
    simple = 0,
    complex = 1,
}

export enum EmailOrPhoneRequirementType {
    optional = 0,
    requireEither = 1, 
    requireBoth = 2
}
   
export const assetDistributionSchemeText = [
    {
        scheme: EleosAssetDistributionGrandScheme.simple, 
        text: [
            'All assets to other spouse when one spouse dies and to children evenly when both die',
            '当夫妻一方去世时，所有资产都归另一方所有；当夫妻都去世后·，所有资产都归孩子平均分配'
        ]
    },   
    {
        scheme: EleosAssetDistributionGrandScheme.complex, 
        text: [
            'Some assets need compleex distribution rules',
            '有些资产需要复杂的分配规则'
        ],
    }
]



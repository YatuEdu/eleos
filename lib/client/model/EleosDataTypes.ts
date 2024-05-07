export enum EleosRole {
    principal = 0,
    spouse = 1,
    child = 2, 
    otherBenificiary = 3,
    exSpouse = 4,
    executor = 5,
    child_guardian = 6, 
    power_of_attorney = 7,  
    lawyer = 8,  
    witness = 9,
    other = 10,
}

export enum EleosPropertyTypeId {
    realEstate = 'Real Estate',
    bankAccount = 'Bank Account',
    investment = 'iNvestment account',
    retirement = 'Retirement account',
    lifeInsurance = 'Life insurance',
    business = 'Business ownership or shares',
    vehciles = 'Vehicles',
    cash = 'Cash',
    other = 'Untitiled Assets',
}

export enum EleosAssetOwnerShipTypeId {
    joint = 'Marital Assets',
    individualForSingle = 'Individually Owned Assets',
    separate = 'Separate Assets for each spouse',
    trust = 'Owned by a trust',
    prenuptial = 'Governed by a prenuptial agreement',
    other = 'Untitiled Assets',
}

export enum EleosMaritalStatus {
    married = 'Married',
    single = 'Single',
    divorced = 'Divorced',
    widowed = 'Widowed',
}

export const ELEOS_OWNERSHIP_TYPE_LIST_SINGLE: EleosAssetOwnerShipTypeId[] = [
    EleosAssetOwnerShipTypeId.individualForSingle,
    EleosAssetOwnerShipTypeId.trust,
    EleosAssetOwnerShipTypeId.other,
]

export const ELEOS_OWNERSHIP_TYPE_LIST_MARRIED: EleosAssetOwnerShipTypeId[] = [
    EleosAssetOwnerShipTypeId.joint,
    EleosAssetOwnerShipTypeId.separate,
    EleosAssetOwnerShipTypeId.prenuptial,
    EleosAssetOwnerShipTypeId.trust,
    EleosAssetOwnerShipTypeId.other
]

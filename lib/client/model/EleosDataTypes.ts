import Eleos from "./Eleos"
import EleosPerson from "./EleosPerson"

export enum EleosRole { 
    beneficiary = 1, 
    executor = 2, 
    child_guardian = 3, 
    power_of_attorney = 4,  
    lawyer = 5,  }

    export enum EleosPropertyTypeId {
        realEstate = 1,
        bankAccount = 2,
        investment = 3,
        retirement = 4,
        lifeInsurance = 5,
        business = 6,
        cash = 7,
        other = 100,
    }

    export enum EleosAssetOwnerShipTypeId {
        joint = 1,
        individualForSingle = 2,
        separately = 3,
        trust = 4,
        prenuptial = 5,
        other = 100,
    }

    export enum EleosMaritalStatus {
        married = 'Married',
        single = 'Single',
        divorced = 'Divorced',
        widowed = 'Widowed',
    }

    export const OWNER_SHIP_SEPARATE = 'Separate Property' // Separately owned by you or your spouse'
    export const OWNER_SHIP_JOINT = 'Marital Property' // Jointly owned by you and your spouse'
    export const OWNER_SHIP_JOINT_CM = 'Community Property' // Jointly owned by you and your spouse'
    export const OWNER_SHIP_TRUST = 'Owned by a trust'
    export const OWNER_SHIP_PRENUP = 'Prenuptial agreement'
    export const OWNER_SHIP_OTHER = 'Other'

    export const TYPE_REAL_ESTATE = 'Real Estate'
    export const TYPE_BANK_ACCOUNT = 'Bank Account'
    export const TYPE_INVESTMENT = 'Investment account'
    export const TYPE_RETIREMENT = 'Retirement account'
    export const TYPE_LIFE_INSURANCE = 'Life insurance'
    export const TYPE_BUSINESS = 'Business ownership or shares'
    export const TYPE_CASH = 'Cash'
    export const TYPE_OTHER = 'Other asset types'

    export type EleosPropertyType = {
        id: EleosPropertyTypeId,
        name: string,
    }
    
    export type EleosOwnershipType = {
        id: EleosAssetOwnerShipTypeId,
        name: string,
    }

    export const ELEOS_PROPERTY_TYPE_LIST: EleosPropertyType[] = [
        { id: EleosPropertyTypeId.realEstate, name: TYPE_REAL_ESTATE},
        { id: EleosPropertyTypeId.bankAccount, name: TYPE_BANK_ACCOUNT },
        { id: EleosPropertyTypeId.investment, name: TYPE_INVESTMENT },
        { id: EleosPropertyTypeId.retirement, name: TYPE_RETIREMENT },
        { id: EleosPropertyTypeId.lifeInsurance, name: TYPE_LIFE_INSURANCE },
        { id: EleosPropertyTypeId.business, name: TYPE_BUSINESS },     
        { id: EleosPropertyTypeId.cash, name: TYPE_CASH },
        { id: EleosPropertyTypeId.other, name: TYPE_OTHER},
    ]

    export const ELEOS_OWNERSHIP_TYPE_LIST_MARRIED: EleosOwnershipType[] = [
        { id: EleosAssetOwnerShipTypeId.joint, name: OWNER_SHIP_JOINT},
        { id: EleosAssetOwnerShipTypeId.separately, name:  OWNER_SHIP_SEPARATE},
        { id: EleosAssetOwnerShipTypeId.trust, name: OWNER_SHIP_TRUST },
        { id: EleosAssetOwnerShipTypeId.prenuptial, name: OWNER_SHIP_PRENUP },
        { id: EleosAssetOwnerShipTypeId.other, name: OWNER_SHIP_OTHER },
    ]

    export const ELEOS_OWNERSHIP_TYPE_LIST_SINGLE: EleosOwnershipType[] = [
        { id: EleosAssetOwnerShipTypeId.individualForSingle, name: 'Individually' },
        { id: EleosAssetOwnerShipTypeId.trust, name: 'Owneed by a trust' },
    ]

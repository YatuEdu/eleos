import EleosOptionType from "./EleosOptionType"

export enum EleosAssetOwnerShipType {
    joint = 'Marital Assets',
    individualForSingle = 'Individually Owned Assets',
    separate = 'Separate Assets for each spouse',
    trust = 'Owned by a trust',
    prenuptial = 'Use prenuptial agreement',
    other = 'Untitiled Assets',
}

export interface EleosAssetOwnerShipTypeWithLabel {
    value: EleosAssetOwnerShipType;
    label: string;
}

export const ELEOS_OWNERSHIP_TYPE_LIST_SINGLE: EleosAssetOwnerShipType[] = [
    EleosAssetOwnerShipType.individualForSingle,
    EleosAssetOwnerShipType.trust,
    EleosAssetOwnerShipType.other,
]

export const ELEOS_OWNERSHIP_TYPE_LIST_MARRIED: EleosAssetOwnerShipType[] = [
    EleosAssetOwnerShipType.joint,
    EleosAssetOwnerShipType.separate,
    EleosAssetOwnerShipType.prenuptial,
    EleosAssetOwnerShipType.trust,
    EleosAssetOwnerShipType.other
]

export class EleosAssetOwnerShipTypeHelper {
    private pownershipType = new EleosOptionType(EleosAssetOwnerShipType)
 
    get values() : EleosAssetOwnerShipType[] {
         return this.pownershipType.values as EleosAssetOwnerShipType[]
    }

    get entries() : [string, string][] {
        return this.pownershipType.entries
    }

    keyToValue(key: string): string {
        return this.pownershipType.keyToValue(key)
    }

    valueToKey(value: string): string {
        return this.pownershipType.valueToKey(value)
    }

    getlabelValuePairs() : {label: string, value: string} [] {
        return this.pownershipType.getLabelValuePairs()
    }

    getlabelValuePairsForSingle() : {label: string, value: string} [] {
        return this.pownershipType
                    .getLabelValuePairs()
                    .filter((pair) => ELEOS_OWNERSHIP_TYPE_LIST_SINGLE.includes(pair.value as EleosAssetOwnerShipType))
    }

    getlabelValuePairsForCouples() : {label: string, value: string} [] {
        return this.pownershipType
                    .getLabelValuePairs()
                    .filter((pair) => ELEOS_OWNERSHIP_TYPE_LIST_MARRIED.includes(pair.value as EleosAssetOwnerShipType))
    }

    static getlabelValuePairsForTilitedAsset(pairs: {label: string, value: string}[] ) : {label: string, value: string} [] {
        return pairs.filter((pair) => pair.value !== EleosAssetOwnerShipType.other)
    }

    static getlabelValuePairsForUntilitedAsset(pairs: {label: string, value: string}[] ) : {label: string, value: string} [] {
        return pairs.filter((pair) => pair.value === EleosAssetOwnerShipType.separate || pair.value === EleosAssetOwnerShipType.individualForSingle)
    }

 }
 
 export const EAOT_HELPER = new EleosAssetOwnerShipTypeHelper()
 
 
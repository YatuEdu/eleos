import EleosOptionType 
                from "./EleosOptionType";
import React 
                from "react";

export enum EleosAssetType {
    realEstate = 'Real Estate',
    bankAccount = 'Bank Account',
    investment = 'Investment account',
    retirement = 'Retirement account',
    lifeInsurance = 'Life insurance',
    business = 'Business ownership or shares',
    vehicles = 'Vehicles',
    cash = 'Cash',
    other = 'Untitiled Assets',
}

export interface EleosPropertyTypeWithLabel {
    value: EleosAssetType;
    label: string;
}

export interface EleosPropertyTypIconAndToolTip {
    icon: React.JSX.Element;
    toolTip: string;
}

class EleosPropertyTypeHelper {
   private propertyType = new EleosOptionType(EleosAssetType)

    get values() : EleosAssetType[] {
        return this.propertyType.values as EleosAssetType[]
    }

    get entries() : [string, string][] {
        return this.propertyType.entries
    }

    keyToValue(key: string): string {
        return this.propertyType.keyToValue(key)
    }

    valueToKey(value: string): string {
        return this.propertyType.valueToKey(value)
    }

    getlabelValuePairs() : {label: string, value: string} [] {
        return this.propertyType.getLabelValuePairs()
    }
}

export const EPT_HELPER = new EleosPropertyTypeHelper()


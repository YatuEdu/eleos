import EleosOptionType 
                from "./EleosOptionType";
import React 
                from "react";

export enum EleosRelationshipType {
    principal = 'Principal',
    spouse = 'Spouse',
    son = 'Son',
    daughter = 'Daughter',
    grandson = 'Grandson',
    granddaughter = 'Granddaughter',
    grandfather = 'Grandfather',
    grandmother = 'Grandmother',
    uncle = 'Uncle',
    aunt = 'Aunt',
    other_relative = 'Other relative',
    friend = 'Friend',
    lawyer = 'Lawyer',
}

const RELATIONSHIP_CHILDREN_LIST: EleosRelationshipType[] = [
    EleosRelationshipType.son,
    EleosRelationshipType.daughter,
]

const RELATIONSHIP_ADDITIONAL_HEIR_LIST: EleosRelationshipType[] = [
    EleosRelationshipType.grandson,
    EleosRelationshipType.granddaughter,
    EleosRelationshipType.other_relative,
    EleosRelationshipType.friend,
]

const RELATIONSHIP_GUARDIAN_LIST: EleosRelationshipType[] = [
    EleosRelationshipType.grandfather,
    EleosRelationshipType.grandmother,
    EleosRelationshipType.uncle,
    EleosRelationshipType.aunt,
    EleosRelationshipType.other_relative,
    EleosRelationshipType.friend,
    EleosRelationshipType.lawyer,
]

const RELATIONSHIP_EXECUTOR_LIST: EleosRelationshipType[] = [
    EleosRelationshipType.son,
    EleosRelationshipType.daughter,
    EleosRelationshipType.other_relative,
    EleosRelationshipType.friend,
    EleosRelationshipType.lawyer,
]

class EleosRelationshipTypeHelper {
   private relationshipType = new EleosOptionType(EleosRelationshipType)

    get values() : EleosRelationshipType[] {
        return this.relationshipType.values as EleosRelationshipType[]
    }

    get entries() : [string, string][] {
        return this.relationshipType.entries
    }

    keyToValue(key: string): string {
        return this.relationshipType.keyToValue(key)
    }

    valueToKey(value: string): string {
        return this.relationshipType.valueToKey(value)
    }

    getlabelValuePairs() : {label: string, value: string} [] {
        return this.relationshipType.getLabelValuePairs()
    }

    getlabelValuePairsForChildren() : {label: string, value: string} [] {
        return this.relationshipType
        .getLabelValuePairs()
        .filter((pair) => RELATIONSHIP_CHILDREN_LIST.includes(pair.value as EleosRelationshipType))
    }

    getlabelValuePairsForAdditionalHeirs() : {label: string, value: string} [] {
        return this.relationshipType
        .getLabelValuePairs()
        .filter((pair) => RELATIONSHIP_ADDITIONAL_HEIR_LIST.includes(pair.value as EleosRelationshipType))
    }

    getlabelValuePairsForGuardian() : {label: string, value: string} [] {
        return this.relationshipType
        .getLabelValuePairs()
        .filter((pair) => RELATIONSHIP_GUARDIAN_LIST.includes(pair.value as EleosRelationshipType))
    }

    getlabelValuePairsForExecutor() : {label: string, value: string} [] {
        return this.relationshipType
        .getLabelValuePairs()
        .filter((pair) => RELATIONSHIP_EXECUTOR_LIST.includes(pair.value as EleosRelationshipType))
    }
}

export const ELEOS_RELATIONSHIP_TYPE_HELPER = new EleosRelationshipTypeHelper()


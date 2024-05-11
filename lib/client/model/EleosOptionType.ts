import { Label } from "@mui/icons-material";

type FormatLabel = (value: string, parameter: string) => string

/**
 * This class is used to enhanse the functionality of an Eleos Enum type, when the
 * type is used in a form, such that the values are displayed as a dropdown list or
 * radio buttons.
 */
class EleosOptionType<T extends Record<string, string>> {
    private enumObject: T;

    constructor(enumObject: T) {
        this.enumObject = enumObject;
    }

    get values() : string[] {
        return Object.values(this.enumObject)
    }

    get entries() : [string, string][] {
        return Object.entries(this.enumObject)
    }

    getLabelValuePairs() : {label: string, value: string} [] {
        return Object.entries(this.enumObject).map((entry) => ({label: entry[1], value: entry[1]}))
    }

    keyToValue(key: string): string {
        if (!key) {
            return ''
        }

        const entry =  this.entries.find((entry) => entry[0] === key)
        if (!entry) {
            throw new Error(`Invalid key: ${key}`)
        }
        return entry[1]
    }

    valueToKey(value: string): string {
        const entry =  this.entries.find((entry) => entry[1] === value)
        if (!entry) {
            throw new Error(`Invalid key: ${value}`)
        }
        return entry[0]
    }
}

export default EleosOptionType


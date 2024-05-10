export enum EleosChildrenStatusValue {
    hasChildren = 'has_children',
    hasNoChildren = 'has_no_children',
}

export interface EleosChildrenStatusWithLabel {
    value: EleosChildrenStatusValue;
    label: string;
}

class EleosChildrenStatus {
    static get  childrenStatusValues() {
        return Object.values(EleosChildrenStatusValue)
     }

     static childrenStatusLabeledValues(title: string): EleosChildrenStatusWithLabel[]{
        return Object.values(EleosChildrenStatusValue).map((value) => {
            return { value: value, label: EleosChildrenStatus.fromValueToLabel(value, title) }
        })
     }

     private static fromValueToLabel(value: EleosChildrenStatusValue, title: string) {
        switch (value) {
            case EleosChildrenStatusValue.hasChildren:
                return ` ${title} have children`
            case EleosChildrenStatusValue.hasNoChildren:
                return ` ${title} have no children`
            default:
                throw new Error(`Unknown value: ${value}`)
        }   
    }
}

export default EleosChildrenStatus

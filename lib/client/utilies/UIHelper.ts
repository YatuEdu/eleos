export const SPOUSE_FIRST_NAME_INPUT_ID = 'spouse_name_firstname_input'
export const MODAL_ID = '_modal'
export const ELEOS_NAME_ID = '_name'
export const FIRST_NAME_INPUT_ID = '_firstname'
export const INPUT_ID = '_input'
export const BTN_ID = '_btn'
export const ADD_CHILD = 'add_child'
export const ELEOS_BTN_ID = '_eleos_btn'
export const ADD_EXECUTOR = 'add_executor'
export const ELEOS_PHONE_INPUT_ID = 'eleos_phone_input'
export const eleosModalButtonId = (actionName: string) => {
    return actionName + MODAL_ID + ELEOS_BTN_ID + BTN_ID 
}

export const addPersonModalFirstNameId = (actionName: string) => {
    return actionName + MODAL_ID + ELEOS_NAME_ID + FIRST_NAME_INPUT_ID + INPUT_ID 
}

export const focusOnDomElement = (elementId: string) => {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            console.log('focusOnDomElement', elementId)
            element.focus();
        }
    }, 10)
}

export const excludeSetOptionForRadio = (options: {label: string, value: string | any} [], selected: string | any | undefined)  => {
    if (!selected) {
        return []
    }
    return options.filter(option => option.value !== selected)
                  .map(option => option.value)
}
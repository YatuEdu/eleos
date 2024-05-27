export const SPOUSE_FIRST_NAME_INPUT_ID = 'spouse_name_firstname_input'
export const MODAL_ID = '_modal'
export const ELEOS_NAME_ID = '_name'
export const FIRST_NAME_INPUT_ID = '_firstname'
export const INPUT_ID = '_input'
export const BTN_ID = '_btn'
export const ADD_CHILD = 'add_child'
export const ELEOS_BTN_ID = '_eleos_btn'

export const addChildModalButtonId = () => {
    return ADD_CHILD + MODAL_ID + ELEOS_BTN_ID + BTN_ID 
}

export const addChildModalFirstNameId = () => {
    return ADD_CHILD + MODAL_ID + ELEOS_NAME_ID + FIRST_NAME_INPUT_ID + INPUT_ID 
}

export const focusOnDomElement = (elementId: string) => {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus();
        }
    }, 10)
}
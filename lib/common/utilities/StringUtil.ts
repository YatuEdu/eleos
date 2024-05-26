export function normalizeName(name: string) {
    // Trim the name to remove leading and trailing spaces
    if (typeof name === 'string') {
        // Capitalize the first letter and make all other letters lowercase
        return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    }
    return ''
}

export function autoCompleteEmail(value: string): string {
    if (!value) 
        return '';

    let newEmail = value.toLowerCase();

    // Check if the user has entered '@' and provide a suggestion if not already present
    if (value.includes('@')) {
        if (value.endsWith('@g')) {
            newEmail = value + 'mail.com';
        } else if (value.endsWith('@h')) {
            newEmail = value + 'otmail.com';
        } else if (value.endsWith('@y')) {
            newEmail = value + 'ahoo.com';
        } else if (value.endsWith('@a')) {
            newEmail = value + 'ol.com';
        } else if (value.endsWith('@q')) {
            newEmail = value + 'q.com';
        } else if (value.endsWith('@i')) {
            newEmail = value + 'cloud.com';
        } else if (value.endsWith('@o')) {
            newEmail = value + 'utlook.com';
        }
    }

    return newEmail;
}   

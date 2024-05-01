export function normalizeName(name: string) {
    // Trim the name to remove leading and trailing spaces
    if (typeof name === 'string') {
        // Capitalize the first letter and make all other letters lowercase
        return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    }
    return ''
}

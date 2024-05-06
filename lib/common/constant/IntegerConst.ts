export const IntegerConst = {
    MAX_AGE: 88,
}

export function checkBirthYear(value: string) {
    const birthYearInt = parseInt(value)
    const currentYear = new Date().getFullYear()
    if (currentYear - birthYearInt < 0 || currentYear - birthYearInt > IntegerConst.MAX_AGE) {
        return false
    }

    return true
}

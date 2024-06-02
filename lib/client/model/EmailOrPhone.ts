import { REGEX_EMAIL, REGEX_US_MOBILE_PHONE2 } from "@/lib/common/constant/StringConst"

class EmailOrPhone {
    private _phone: string | undefined = undefined
    private _email: string | undefined= undefined

    constructor(email: string | undefined, phone: string | undefined) {
    
        if (!phone && !email) {
            throw new Error('This class must have an email or a phone number')
        }
        if (email && !REGEX_EMAIL.test(email)) {
            throw new Error(`Invalid email address: ${email}`)
        }
        if (phone && !REGEX_US_MOBILE_PHONE2.test(phone)) {
            throw new Error(`Invalid phone number: ${phone}`)
        }
        this._phone = phone
        this._email = email
    }

    get email(): string  | undefined {
        return this._email
    }

    get phone(): string  | undefined {
        return this._phone
    }

    get hasBoth(): boolean {
        return this._phone && this._email ? true : false
    }

    get hasEither(): boolean {
        return this._phone || this._email ? true : false
    }
    
    get hasEmail(): boolean {
        return this._email ? true : false
    }

    get hasPhone(): boolean {
        return this._phone ? true : false
    }
}

export default EmailOrPhone
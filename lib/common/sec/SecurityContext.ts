import { Session } from "next-auth"

class SecurityContext {
    #userId: string | undefined
    #email: string | undefined | null
    #isAnonymous: boolean | undefined 

    constructor(session: Session | null | undefined) {
        if (!session) {
            return;
        }
        this.#userId = session.user.id
        this.#email = session.user.email
        this.#isAnonymous = session.user.isAnonymous
    }

    get userId() { return this.#userId}

    get email() { return this.#email}

    get isAnonymous() { return this.#isAnonymous }
}

export default SecurityContext

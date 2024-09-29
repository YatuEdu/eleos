import { AuthenticatedResponse, Credentials } from "@/lib/server/model/AuthenticatedUser"

class AuthService {
    static async authenticate(credentials: Credentials): Promise<AuthenticatedResponse> {
        return {user: {
            id: "ancd", 
            email: "ly8838@gmail.com", 
            role: "user", 
            isAnonymous: true, 
            lastName: "abc", 
            token: '', 
            firstName:'',
            middleName: '',
        }}
    }
}

export default AuthService
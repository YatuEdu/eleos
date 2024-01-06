export type User =  {
    id: string,
    email: string,
    role: string,
    age: number,
    org: string
}

export type AuthenticatedResponse = {
    user: User
}

export type Credentials = {
    email: string,
    password: string,
    
}
export type YatuUser =  {
    id: string,
    email: string,
    token: string,
    lastName: string,
    middleName: string,
    firstName: string,
    role: string,
    isAnonymous: boolean,
}

export type AuthenticatedResponse = {
    user: YatuUser
}

export type Credentials = {
    email: string,
    password: string,
    
}
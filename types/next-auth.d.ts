import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        yatuToken:  string,
        id:         string,
        email:      string,
        name:       string,
        role:       string,
        isAnonymous: boolean,
    }
   
    interface Session extends DefaultSession {
      user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        yatuToken:  string,
        id:         string,
        email:      string,
        name:       string,
        role:       string,
        isAnonymous: boolean,
    }
}

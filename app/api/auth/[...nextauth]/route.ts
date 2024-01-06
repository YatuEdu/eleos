import AuthService          from "@/lib/server/utilities/AuthService"
import NextAuth             from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await AuthService.authenticate(credentials)
          if (typeof res !== "undefined") {
            return {...res.user}
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
import { NextAuthOptions }  from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import Yatu                 from '@/lib/server/restclient/yatu';
import { YatuUser }         from '@/lib/server/model/authenticatedUser';

/**
 * authOptions is the configuration info for the entire app auth
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { 
            label: 'Password', 
            type: 'password' 
        },
      },
      async authorize(credentials: any, req ) {
        const {email, password} = credentials
        if (!password) {
          return null
        }

        // call yatu API to get yatu token for authenticated users
        const {ok, payload, error} = await Yatu.login(email, password)

        if (!ok) {
          // @ts-ignore
          console.log("login failure:", error.message)
          return null
        }

        const user: YatuUser = payload as YatuUser
        return {
            yatuToken: user.token,
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.middleName} ${user.lastName}`,
            role: user.role,
            isAnonymous: user.isAnonymous,
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        return {
          ...token,
          ...user
        }
      }
      return token
    },
  },
}

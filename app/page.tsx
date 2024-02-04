import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
}                             from '@/components/client/authButtons'


import { Card, Title, Text }  from '@tremor/react'
import { getServerSession }   from "next-auth/next"
import { authOptions }        from '@/lib/server/utilities/sec/authOptions'

export default async function page({}) {
  const session = await getServerSession(authOptions)
  //const mySecurityContext = new SecurityContext(session)

  return (
    <main className="px-12 py-12">
      <Title>Login</Title>
      <div className="mt-8">
        <div className="mt-4">
          <LoginButton />
          <LogoutButton />
          <ProfileButton /> <br />
          <RegisterButton />
        </div>

        <Card className="mt-4">
          <h1>Server Session</h1>
          <pre>{JSON.stringify(session)}</pre>
        </Card>
      </div>
    </main>
  )
}

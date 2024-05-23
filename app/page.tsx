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
    <main className="px-12 py-0">
      <img src="/image/family2.png" alt="Eleos Logo" className="w-600 h-auto" />
      <img src="/image/family1.png" alt="Eleos Logo" className="w-600 h-auto" />
      <img src="/image/family.png" alt="Eleos Logo" className="w-600 h-auto" />
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

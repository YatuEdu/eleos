'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@tremor/react'

export const LoginButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </Button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>
}

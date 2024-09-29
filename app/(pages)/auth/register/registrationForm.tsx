'use client'

import { RegistrationForm } from '@/lib/server/model/authenticatedUser'
import { YatuResponse } from '@/lib/server/model/sysType'
import { Label }            from '@mui/icons-material'
import { Checkbox }         from '@mui/material'
import { signIn }           from 'next-auth/react'
import React, { useState }  from 'react'

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [registered, setRegistered] = useState(false)
  let [formValues, setFormValues] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
  })

  /**
   * Submit registration
   * 
   * @param e 
   * @returns 
   */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const reqForm = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        middleName: formValues.middleName,
        email:      anonymous ? '' : formValues.email,
        password:   anonymous ? '' : formValues.password,
      }
      const res = await fetch('/api/auth/registration', {
        method: 'POST',
        body:   JSON.stringify(reqForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const yatuResponse: YatuResponse = await res.json()
      console.log(yatuResponse)
      setLoading(false)
      if (!res.ok) {
        alert((yatuResponse))
        return
      }
      
      // sign in explicitly for registered users
      if (!anonymous) {
        signIn('email', { callbackUrl: '/' })
      } else {
        // sign in inexplicitly for anonymou users

        // @ts-ignore
        const returnedEmail = yatuResponse.data.email
        console.log("returned email is:", returnedEmail)
        // API sign in
        const signInUrl = 'http://localhost:3000/api/auth/callback/credentials'
        const credential = {
          csrfToken: '9c49e17d58a2ef985b5afe80a9eaa68f0cacc25506adf135544110111ba0de2c',
          email: returnedEmail,
          password: 'yatu8838@anon'  // tbd store this somewhere on the server
        }
        const signinResponse = await fetch(signInUrl, {
          method: 'POST',
          body:   JSON.stringify(credential),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(signinResponse)

        // go to next page
        setRegistered(true)
      }
     
    } catch (error) {
      setLoading(false)
      console.error(error)
      alert(JSON.stringify(error))
    }
  }

  /**
   * Keep the state changes
   * @param event 
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  // render the html content
  return (
    <div>
      {!registered &&
      <React.Fragment>
        <Checkbox checked={anonymous}
                onChange={(e) => {
                  setAnonymous(e.target.checked)
                }}
                /> <span> Staty Anonymous</span>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 500,
            rowGap: 10,
          }}
          >
          <label htmlFor="firstName">First Name</label>
          <input
            required
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            style={{ padding: '1rem' }}
          />
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formValues.middleName}
            onChange={handleChange}
            style={{ padding: '1rem' }}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            style={{ padding: '1rem' }}
          />
          {!anonymous && 
          <>
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              style={{ padding: '1rem' }}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              style={{ padding: '1rem' }}
            />
          </>
          }
          <button
            style={{
              backgroundColor: `${loading ? '#ccc' : '#3446eb'}`,
              color: '#fff',
              padding: '1rem',
              cursor: 'pointer',
            }}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Register'}
          </button>
        </form>
      </React.Fragment>
    }
    {
      registered && 
        <React.Fragment>
          <label htmlFor="executor">Email</label>
          <input
            required
            type="text"
            name="executor"
            value={'executor'}
            onChange={handleChange}
            style={{ padding: '1rem' }}
          />
        </React.Fragment>
    }
  </div>
  )
}

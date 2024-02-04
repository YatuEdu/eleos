import { RegisterForm } from './registrationForm'

export default function RegisterPage() {
  return (
    <div
      style={{
        display: 'flex',
        height: '70vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

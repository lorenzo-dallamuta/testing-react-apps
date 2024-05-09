'use client'

import { FormEvent } from 'react'

// this renders a login UI and calls the onSubmit handler with the username
// and password when the user submits the form.

function Login({ onSubmit }: { onSubmit: (data: UserAuth) => void }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { username, password } = event.currentTarget

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Login

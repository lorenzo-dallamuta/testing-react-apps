// form testing
// http://localhost:3000/login
import * as React from 'react'
import { vi } from 'vitest'
import { expect, test } from 'vitest'
import Login from '@/components/Login'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // let submittedData
  //   const handleSubmit = data => (submittedData = data)
  const handleSubmit = vi.fn()
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  const { username, password } = buildLoginForm({ password: '1m$tR0Nk' })
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  // 🐨 click on the button with the text "Submit"
  const submit = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submit)
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  // expect(submittedData).toEqual({ username: 'admin', password: 'admin'})
  expect(handleSubmit).toHaveBeenCalledWith({ username, password })
})

function buildLoginForm({ password } = { password: '' }) {
  return build({
    fields: {
      username: faker.internet.userName(),
      password:
        // min length, etc. (faker actually can satisfy a regex...)
        password.length >= 8
          ? password
          : faker.internet.password({ length: 8 }),
    },
  })()
}

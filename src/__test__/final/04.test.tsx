// form testing
// http://localhost:3000/login
import { expect, test } from 'vitest'
import Login from '@/components/Login'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  const handleSubmit = (data: UserAuth) => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)
  const username = 'chucknorris'
  const password = 'i need no password'

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(submittedData).toEqual({
    username,
    password,
  })
})

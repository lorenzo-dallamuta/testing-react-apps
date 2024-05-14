// form testing
// 💯 generate test data
// http://localhost:3000/login
import { expect, test, vi } from 'vitest'
import Login from '@/components/Login'
import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = vi.fn()
  render(<Login onSubmit={handleSubmit} />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

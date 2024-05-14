// form testing
// 💯 use Test Data Bot
// http://localhost:3000/login
import { expect, test, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/components/Login'

const buildLoginForm = build({
  fields: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
})

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

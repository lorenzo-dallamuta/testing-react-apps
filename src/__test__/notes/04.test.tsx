// form testing
// http://localhost:3000/login
import { vi } from 'vitest'
import { expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/components/Login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = vi.fn()
  render(<Login onSubmit={handleSubmit} />)
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const { username, password } = buildLoginForm({ password: '1m$tR0Nk' })
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  const submit = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submit)
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

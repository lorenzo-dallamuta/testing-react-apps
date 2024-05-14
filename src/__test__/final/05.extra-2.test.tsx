// mocking HTTP requests
// 💯 test the unhappy path
// http://localhost:3000/login-submission
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/components/LoginSubmission'
import { handlers } from '@/tests/server-handlers'

const buildLoginForm = build({
  fields: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the password results in an error', async () => {
  render(<Login />)
  const { username } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // don't type in the password
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent('password required')
})

// mocking HTTP requests
// http://localhost:3000/login-submission
import { HttpResponse, PathParams, delay, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, expect, test } from 'vitest'
import Login from '@/components/LoginSubmission'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const buildLoginForm = build({
  fields: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
})

const server = setupServer(
  http.post<PathParams, UserAuth>(
    'https://auth-provider.example.com/api/login',
    async ({ request }) => {
      const payload = await request.json()
      await delay(10)
      if (!payload.password) {
        return HttpResponse.json(
          { message: 'password required' },
          { status: 400 },
        )
      }
      if (!payload.username) {
        return HttpResponse.json(
          { message: 'username required' },
          { status: 400 },
        )
      }
      return HttpResponse.json({ username: payload.username })
    },
  ),
)

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

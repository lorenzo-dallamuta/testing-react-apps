// mocking HTTP requests
// http://localhost:3000/login-submission
import { HttpResponse, delay, http } from 'msw'
import { setupServer } from 'msw/node'
import * as React from 'react'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginSubmission from '@/components/LoginSubmission'
import { handlers } from '@/tests/server-handlers'

const buildLoginForm = build({
  fields: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
})

// const server = setupServer(
//   http.post(
//     'https://auth-provider.example.com/api/login',
//     async ({ request, params }) => {
//       const payload = await request.json()
//       if (!payload.username || !payload.password) {
//         return HttpResponse.error()
//       } else {
//         return HttpResponse.json({ username: payload.username })
//       }
//     },
//   ),
// )
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers()) // removes handlers added with server.use etc.
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<LoginSubmission />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  // NOTE, for the server should delay its response a bit for the spinner to be rendered
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(new RegExp(username, 'i'))).toBeInTheDocument()
})

test(`logging in without password yields an error`, async () => {
  render(<LoginSubmission />)
  const { username } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  // NOTE, for the server should delay its response a bit for the spinner to be rendered
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test(`server errors yield a ux error`, async () => {
  // setup
  const serverErrorMessage = 'ooooops'
  server.use(
    http.post('https://auth-provider.example.com/api/login', async () => {
      await delay(100)
      return HttpResponse.json({ message: serverErrorMessage }, { status: 500 })
      // return HttpResponse.error() // this would mock a network error...
    }),
  )

  // render
  render(<LoginSubmission />)

  // interaction
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  // NOTE, for the server should delay its response a bit for the spinner to be rendered
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // assertions
  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(serverErrorMessage)
})

// mocking HTTP requests
// http://localhost:3000/login-submission
// 🐨 you'll need to import http from 'msw' and setupServer from msw/node
import { HttpResponse, delay, http } from 'msw'
import { setupServer } from 'msw/node'
import * as React from 'react'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import LoginSubmission from '@/components/LoginSubmission'
import { handlers } from '@/tests/server-handlers'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
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

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// http.post(
//   'https://auth-provider.example.com/api/login',
//   async () => {}
// ),
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/
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

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers()) // removes handlers added with server.use etc.
// 🐨 after all the tests, stop the server with `server.close()`
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<LoginSubmission />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(new RegExp(username, 'i'))).toBeInTheDocument()
})

test(`logging in without password yields an error`, async () => {
  render(<LoginSubmission />)
  const { username } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

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
      // return HttpResponse.error()
    }),
  )

  // render
  render(<LoginSubmission />)

  // interaction
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // assertions
  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(serverErrorMessage)
})

// mocking Browser APIs and modules
// http://localhost:3000/location
import * as React from 'react'
import { expect, test, vi } from 'vitest'
import Location from '@/app/location/page'
import { deferred } from '@/tests/utils'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { act, render, screen } from '@testing-library/react'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
const getCurrentPosition = vi.fn()
vi.stubGlobal('navigator', {
  ...window.navigator,
  geolocation: { ...window.navigator.geolocation, getCurrentPosition },
})

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = { coords: buildGeolocationCoordinates() }
  // 🐨 create a deferred promise here
  const { promise, resolve } = deferred()
  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)
  //
  // 🐨 so call mockImplementation on getCurrentPosition
  // 🐨 the first argument of your mock should accept a callback
  // 🐨 you'll call the callback when the deferred promise resolves
  // 💰 promise.then(() => {/* call the callback with the fake position */})
  getCurrentPosition.mockImplementationOnce((success, error, options) => {
    promise.then(() => success(fakePosition))
  })
  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)
  //
  // 🐨 verify the loading spinner is showing up
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  // screen.debug()
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  // 🐨 resolve the deferred promise
  await act(async () => resolve())
  // 🐨 wait for the promise to resolve
  await promise
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  // act(() => {})
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)\
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  // screen.debug()
  expect(screen.getByText(/latitude/i).textContent).toMatchInlineSnapshot(
    `"Latitude: ${fakePosition.coords.latitude}"`,
  )
  expect(screen.getByText(/longitude/i).textContent).toMatchInlineSnapshot(
    `"Longitude: ${fakePosition.coords.longitude}"`,
  )
})

test('geolocation api error yields ux error', async () => {
  const apiError = new Error('ooops')
  const { promise, reject } = deferred()
  getCurrentPosition.mockImplementationOnce((success, error, options) => {
    promise.catch(() => error(apiError))
  })
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  await act(async () => reject())
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // screen.debug()
  expect(screen.getByRole('alert')).toHaveTextContent(apiError.message)
})

function buildGeolocationCoordinates() {
  return build({
    fields: {
      latitude: faker.location.latitude(),
      longitude: faker.location.latitude(),
    },
  })()
}

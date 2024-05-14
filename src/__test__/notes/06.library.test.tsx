// mocking Browser APIs and modules
// http://localhost:3000/location
import * as React from 'react'
import { useCurrentPosition } from 'react-use-geolocation'
import { expect, test, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { act, render, screen } from '@testing-library/react'
import Location from '@/app/location/page'
import { deferred } from '@/tests/utils'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
vi.mock('react-use-geolocation')
// NOTE, that we don't need to use afterEach(() => vi.unmock()) because the mockReset flag is set in vitest config

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = { coords: buildGeolocationCoordinates() }
  // 🐨 create a deferred promise here
  const { promise, resolve } = deferred()
  // 🐨 Now we need to mock the useCurrentPosition hook
  //
  // 🐨 so call mockImplementation on useCurrentPosition
  // 🐨 you'll set the position when the deferred promise resolves
  // 💰 promise.then(() => {/* set the position with the fake position */})
  vi.mocked(useCurrentPosition).mockImplementation(() => {
    const [position, setPosition] = React.useState<
      { coords: Partial<GeolocationCoordinates> } | undefined
    >(undefined)
    promise.then(() => setPosition(fakePosition))
    return [position as GeolocationPosition, undefined] satisfies [
      position: GeolocationPosition | undefined,
      error: undefined,
    ]
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

test('geolocation module error yields ux error', async () => {
  const moduleError = new Error('ooops')
  const { promise, reject } = deferred()
  vi.mocked(useCurrentPosition).mockImplementation(() => {
    const [error, setError] = React.useState<
      GeolocationPositionError | undefined
    >(undefined)
    React.useEffect(() => {
      // @ts-ignore
      promise.catch(() => setError(moduleError))
    }, [])
    return [undefined, error] satisfies [
      position: undefined,
      error: GeolocationPositionError | undefined,
    ]
  })
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  await act(async () => reject())
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // screen.debug()
  expect(screen.getByRole('alert')).toHaveTextContent(moduleError.message)
})

function buildGeolocationCoordinates() {
  return build({
    fields: {
      latitude: faker.location.latitude(),
      longitude: faker.location.latitude(),
    },
  })()
}

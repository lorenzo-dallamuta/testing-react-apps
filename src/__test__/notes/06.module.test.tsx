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

vi.mock('react-use-geolocation')
// NOTE, that we don't need to use afterEach(() => vi.unmock()) because the mockReset flag is set in vitest config

test('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = { coords: buildGeolocationCoordinates() }
  const { promise, resolve } = deferred()
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
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  await act(async () => resolve())
  await promise
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
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

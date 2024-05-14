// mocking Browser APIs and modules
// http://localhost:3000/location
import * as React from 'react'
import { expect, test, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import { build } from '@jackfranklin/test-data-bot'
import { act, render, screen } from '@testing-library/react'
import Location from '@/app/location/page'
import { deferred } from '@/tests/utils'

const getCurrentPosition = vi.fn()
vi.stubGlobal('navigator', {
  ...window.navigator,
  geolocation: { ...window.navigator.geolocation, getCurrentPosition },
})

test('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = { coords: buildGeolocationCoordinates() }
  const { promise, resolve } = deferred()
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  getCurrentPosition.mockImplementationOnce((success, error, options) => {
    promise.then(() => success(fakePosition))
  })
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  await act(async () => resolve())
  await promise
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

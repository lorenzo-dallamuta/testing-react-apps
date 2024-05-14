// mocking Browser APIs and modules
// http://localhost:3000/location
import { beforeAll, expect, test, vi } from 'vitest'
import Location from '@/app/location/page'
import { act, render, screen } from '@testing-library/react'

const getCurrentPosition = vi.fn()
beforeAll(() => {
  vi.stubGlobal('navigator', {
    ...window.navigator,
    geolocation: { ...window.navigator.geolocation, getCurrentPosition },
  })
})

export function deferred() {
  let resolve = (value?: unknown) => {}
  let reject = (reason?: any) => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  const { promise, resolve } = deferred()
  getCurrentPosition.mockImplementation(callback => {
    promise.then(() => callback(fakePosition))
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

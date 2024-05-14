// mocking Browser APIs and modules
// 💯 mock the module
// http://localhost:3000/location
import { Dispatch, SetStateAction, useState } from 'react'
import { useCurrentPosition } from 'react-use-geolocation'
import { expect, test, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import Location from '@/app/location/page'

vi.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }

  let setReturnValue: Dispatch<
    SetStateAction<{ coords: Partial<GeolocationCoordinates> } | undefined>
  >
  function useMockCurrentPosition() {
    const state = useState<
      { coords: Partial<GeolocationCoordinates> } | undefined
    >()
    setReturnValue = state[1]
    return [state[0] as GeolocationPosition, undefined] satisfies [
      position: GeolocationPosition | undefined,
      error: undefined,
    ]
  }
  vi.mocked(useCurrentPosition).mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue(fakePosition)
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

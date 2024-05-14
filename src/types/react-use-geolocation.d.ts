declare module 'react-use-geolocation' {
  function useCurrentPosition(options?: {
    maximumAge?: number
    timeout?: number
    enableHighAccuracy?: boolean
  }):
    | [position: undefined, error: undefined]
    | [position: GeolocationPosition, error: undefined]
    | [position: undefined, error: GeolocationPositionError]

  function useWatchPosition(options?: {
    maximumAge?: number
    timeout?: number
    enableHighAccuracy?: boolean
  }):
    | [position: undefined, error: undefined]
    | [position: GeolocationPosition, error: undefined]
    | [position: undefined, error: GeolocationPositionError]
}

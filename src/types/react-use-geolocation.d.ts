declare module 'react-use-geolocation' {
  function useCurrentPosition(options?: {
    maximumAge?: number
    timeout?: number
    enableHighAccuracy?: boolean
  }): [position: GeolocationPosition, error: GeolocationPositionError]

  function useWatchPosition(options?: {
    maximumAge?: number
    timeout?: number
    enableHighAccuracy?: boolean
  }): [position: GeolocationPosition, error: GeolocationPositionError]
}

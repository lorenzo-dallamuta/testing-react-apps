import { useEffect, useReducer } from 'react'

function useFormSubmission<T, U>({
  endpoint,
  data,
}: {
  endpoint: string
  data: T | null
}) {
  const [state, dispatch] = useReducer(formSubmissionReducer<U>, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  })

  const fetchBody = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (fetchBody) {
      dispatch({ type: 'START' })
      window
        .fetch(endpoint, {
          method: 'POST',
          body: fetchBody,
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(async response => {
          const data = await response.json()
          if (response.ok) {
            dispatch({ type: 'RESOLVE', responseData: data })
          } else {
            dispatch({ type: 'REJECT', error: data })
          }
        })
        .catch(error => {
          dispatch({ type: 'REJECT', error })
        })
    }
  }, [fetchBody, endpoint])

  return state
}

function formSubmissionReducer<T>(
  _state: unknown,
  action: {
    type: 'START' | 'RESOLVE' | 'REJECT'
    responseData?: T
    error?: Error
  },
) {
  switch (action.type) {
    case 'START': {
      return { status: 'pending', responseData: null, errorMessage: null }
    }
    case 'RESOLVE': {
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      }
    }
    case 'REJECT': {
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error?.message,
      }
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

export default useFormSubmission

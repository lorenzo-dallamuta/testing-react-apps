'use client'

import { useState } from 'react'
import Login from '@/components/Login'
import Spinner from '@/components/Spinner'
import useFormSubmission from '@/hooks/useFormSubmission'

// The <LoginSubmission /> component uses our <Login /> component and actually
// submits the formData to /api/login and redirects the user or shows an error
// message if the request failed.
//
// 🚨  You can see a failure by not providing a username or password

function LoginSubmission() {
  const [formData, setFormData] = useState<UserAuth | null>(null)
  const { status, responseData, errorMessage } = useFormSubmission<
    UserAuth,
    { username: string }
  >({
    endpoint: 'https://auth-provider.example.com/api/login',
    data: formData,
  })

  return (
    <>
      {status === 'resolved' ? (
        <div>
          Welcome <strong>{responseData?.username}</strong>
        </div>
      ) : (
        <Login onSubmit={data => setFormData(data)} />
      )}
      <div style={{ height: 200 }}>
        {status === 'pending' ? <Spinner /> : null}
        {status === 'rejected' ? (
          <div role="alert" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default LoginSubmission

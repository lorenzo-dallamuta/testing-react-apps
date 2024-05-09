'use client'

import Login from '@/components/Login'

function Page() {
  return (
    <Login onSubmit={data => alert(`${data.username} - ${data.password}`)} />
  )
}

export default Page

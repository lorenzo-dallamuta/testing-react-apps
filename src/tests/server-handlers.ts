import { HttpResponse, PathParams, delay, http } from 'msw'

const delayAmount = process.env.NODE_ENV === 'test' ? 100 : 1500

const handlers = [
  http.post<PathParams, { username: string; password: string }>(
    'https://auth-provider.example.com/api/login',
    async ({ request }) => {
      const info = await request.json()
      if (!info.password) {
        await delay(delayAmount)
        return HttpResponse.json(
          { message: 'password required' },
          { status: 400 },
        )
      }
      if (!info.username) {
        await delay(delayAmount)
        return HttpResponse.json(
          { message: 'username required' },
          { status: 400 },
        )
      }
      await delay(delayAmount)
      return HttpResponse.json({
        username: info.username,
      })
    },
  ),
]

export { handlers }

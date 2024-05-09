'use client'

import EasyButton from '@/components/EasyButton'
import { ThemeProvider, useTheme } from '@/contexts/theme'

function Page() {
  return (
    <ThemeProvider>
      <h1>Hit the easy button!</h1>
      <hr />
      <EasyButton onClick={() => alert('that was easy')}>Easy!</EasyButton>
      <hr />
      <ThemeToggler />
    </ThemeProvider>
  )
}

function ThemeToggler() {
  const [theme, setTheme] = useTheme()
  return (
    <button onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
      Toggle theme: {theme}
    </button>
  )
}

export default Page

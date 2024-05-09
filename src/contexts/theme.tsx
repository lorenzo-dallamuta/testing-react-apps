import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

// this one doesn't really make sense to render on its own, so don't bother.

const ThemeContext = createContext<
  ['dark' | 'light', Dispatch<SetStateAction<'dark' | 'light'>>]
>(['light', () => {}])

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider')
  }
  return context
}

function ThemeProvider({
  initialTheme = 'light',
  ...props
}: PropsWithChildren & { initialTheme?: 'dark' | 'light' }) {
  const [theme, setTheme] = useState(initialTheme)
  return <ThemeContext.Provider value={[theme, setTheme]} {...props} />
}

export { useTheme, ThemeProvider }

'use client'

import { useTheme } from '@/contexts/theme'

const styles = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    color: 'black',
    backgroundColor: 'white',
  },
}

function EasyButton(props: React.ComponentPropsWithoutRef<'button'>) {
  const [theme] = useTheme()
  return <button style={styles[theme]} {...props} />
}

export default EasyButton

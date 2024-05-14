import React, { PropsWithChildren } from 'react'
import { RenderOptions, render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '@/contexts/theme'

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
export function deferred() {
  let resolve = (value?: unknown) => {}
  let reject = (reason?: any) => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

export function render(
  ui: React.ReactNode,
  {
    theme = 'light',
    ...options
  }: Omit<RenderOptions, 'queries'> & { theme?: 'light' | 'dark' } = {},
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

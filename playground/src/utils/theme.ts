export type ThemeMode = 'light' | 'dark'

export const getTheme = (): ThemeMode => {
  if (typeof document === 'undefined') return 'light'

  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function observeThemeChange(callback: (mode: ThemeMode) => void) {
  const observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-theme'
      ) {
        callback(getTheme())
      }
    })
  })

  observer.observe(document.documentElement, { attributes: true })
  return observer.disconnect
}

export const toggleTheme = () => {
  const theme = getTheme()
  const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'

  document.documentElement.dataset.theme = nextTheme
  document.documentElement.style.colorScheme = nextTheme
  try {
    window.localStorage.setItem('theme', nextTheme)
  } catch {}
}

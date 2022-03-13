import { useEffect } from 'react'

export const useUncaughtError = (callback: (error: string) => void) => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver loop limit exceeded')) return
      event.preventDefault()
      callback(event.message)
    }
    const handleRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault()
      callback(`Unhandled Rejection: ${event.reason?.message || event.reason}`)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])
}

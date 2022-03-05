import { useEffect, useState } from 'react'

const getMatches = (query: string) => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }
  return false
}

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(getMatches(query))

  useEffect(() => {
    const handleChange = () => setMatches(getMatches(query))

    handleChange()

    const matchMedia = window.matchMedia(query)
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

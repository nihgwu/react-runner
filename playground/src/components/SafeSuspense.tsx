import { Suspense, SuspenseProps } from 'react'

import { useMounted } from '../hooks/useMounted'

export const SafeSuspense = (props: SuspenseProps) => {
  const mounted = useMounted()

  if (!mounted) return null
  return <Suspense {...props} />
}

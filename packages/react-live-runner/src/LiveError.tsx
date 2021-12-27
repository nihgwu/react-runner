import React, { ComponentPropsWithoutRef } from 'react'

import { useLiveContext } from './LiveContext'

export const LiveError = (props: ComponentPropsWithoutRef<'pre'>) => {
  const { error } = useLiveContext()

  return error ? <pre {...props}>{error}</pre> : <></>
}

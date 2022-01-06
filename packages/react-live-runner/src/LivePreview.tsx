import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import { useLiveContext } from './LiveContext'

export type LivePreviewProps<T extends ElementType = 'div'> = (
  | { Component: T }
  | { Component?: 'div' }
) &
  ComponentPropsWithoutRef<T>

export const LivePreview = <T extends ElementType = 'div'>({
  Component = 'div',
  ...rest
}: LivePreviewProps<T>) => {
  const { element } = useLiveContext()

  return <Component {...rest}>{element}</Component>
}

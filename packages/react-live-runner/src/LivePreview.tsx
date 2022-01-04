import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import { useLiveContext } from './LiveContext'

export type LivePreviewProps<T extends ElementType = 'div'> = {
  Component?: T
} & ComponentPropsWithoutRef<T>

export const LivePreview = <T extends ElementType = 'div'>({
  Component = 'div' as T,
  ...rest
}: LivePreviewProps<T>) => {
  const { element } = useLiveContext()

  const Comp = Component as ElementType
  return <Comp {...rest}>{element}</Comp>
}

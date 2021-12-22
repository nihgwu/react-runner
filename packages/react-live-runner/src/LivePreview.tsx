import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import { useLiveContext } from './LiveContext'

export type LivePreviewProps<T extends ElementType> = {
  Component?: T
} & ComponentPropsWithoutRef<T>

export const LivePreview = <T extends ElementType>({
  // @ts-ignore
  Component = 'div' as ElementType,
  ...rest
}: LivePreviewProps<T>) => {
  const { element } = useLiveContext()

  // @ts-ignore
  return <Component {...rest}>{element}</Component>
}

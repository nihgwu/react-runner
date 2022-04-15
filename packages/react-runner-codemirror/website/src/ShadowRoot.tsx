import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const ShadowRoot = ({
  children,
  ...rest
}: JSX.IntrinsicElements['div']) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot>()

  useEffect(() => {
    setShadowRoot(ref.current?.attachShadow({ mode: 'open' }))
  }, [])

  return (
    <div ref={ref} {...rest}>
      {shadowRoot && createPortal(children, shadowRoot as any)}
    </div>
  )
}

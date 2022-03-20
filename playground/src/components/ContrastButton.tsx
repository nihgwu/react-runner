import React, { useState } from 'react'
import { Half1Icon, Half2Icon } from '@radix-ui/react-icons'

export const ContrastButton = (props: JSX.IntrinsicElements['button']) => {
  const [contrast, setContrast] = useState(false)

  return (
    <button
      {...props}
      title="Toggle contrast"
      onClick={() => {
        document.body.dataset.contrast = String(!contrast)
        setContrast(!contrast)
      }}
    >
      {contrast ? <Half2Icon /> : <Half1Icon />}
    </button>
  )
}

import { useState } from 'react'
import { ViewVerticalIcon, BoxIcon } from '@radix-ui/react-icons'

export const LayoutButton = (props: JSX.IntrinsicElements['button']) => {
  const [preview, setPreview] = useState(false)

  return (
    <button
      {...props}
      title="Toggle editor"
      onClick={() => {
        document.body.dataset.layout = preview ? 'split' : 'preview'
        setPreview(!preview)
      }}
    >
      {preview ? <BoxIcon /> : <ViewVerticalIcon />}
    </button>
  )
}

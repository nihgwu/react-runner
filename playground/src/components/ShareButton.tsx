import { useState } from 'react'
import { Share1Icon, CopyIcon } from '@radix-ui/react-icons'

export const ShareButton = (props: JSX.IntrinsicElements['button']) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      {...props}
      title="Copy link"
      onClick={() => {
        window.navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 500)
          })
          .catch()
      }}
    >
      {copied ? <CopyIcon /> : <Share1Icon />}
    </button>
  )
}

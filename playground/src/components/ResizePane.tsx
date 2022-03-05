import { Resizable } from 're-resizable'

import { useMediaQuery } from '../hooks/useMediaQuery'
import { useMounted } from '../hooks/useMounted'

const handleStyls = {
  zIndex: 9999,
}

export const ResizePane = ({
  children,
  ...rest
}: Omit<JSX.IntrinsicElements['div'], 'ref'>) => {
  const matches = useMediaQuery('(min-width: 960px)')
  const mounted = useMounted()

  if (!mounted) return <div {...rest}>{children}</div>
  return (
    <Resizable
      {...rest}
      key={String(matches)}
      handleStyles={{
        right: handleStyls,
        top: handleStyls,
      }}
      enable={{
        right: matches,
        top: !matches,
      }}
      defaultSize={{
        width: matches ? '50%' : '100%',
        height: matches ? '100%' : '50%',
      }}
    >
      {children}
    </Resizable>
  )
}

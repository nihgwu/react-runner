import { MouseEvent } from 'react'
import { PlusIcon, Cross1Icon } from '@radix-ui/react-icons'

import styles from './TabBar.module.css'
import clsx from 'clsx'

type TabItemProps = JSX.IntrinsicElements['button'] & {
  isSelected?: boolean
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void
}

const TabItem = ({ children, isSelected, onRemove, ...rest }: TabItemProps) => {
  const selected = Boolean(rest['aria-selected'])
  return (
    <div className={styles.TabItem} aria-selected={isSelected}>
      <button {...rest} className={styles.TabButton}>
        {children}
      </button>
      {onRemove && (
        <button
          title="Remove"
          className={styles.RemoveButton}
          onClick={onRemove}
        >
          <Cross1Icon />
        </button>
      )}
    </div>
  )
}

type TabBarProps = Omit<JSX.IntrinsicElements['div'], 'onTabChange'> & {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  onTabRemove: (tab: string) => void
  onTabAdd: () => void
}

export function TabBar({
  tabs,
  activeTab,
  onTabChange,
  onTabAdd,
  onTabRemove,
  ...rest
}: TabBarProps) {
  return (
    <div {...rest} className={clsx(styles.TabBar, rest.className)}>
      {tabs.map((tab, idx) => (
        <TabItem
          key={tab}
          isSelected={tab === activeTab}
          onClick={() => onTabChange(tab)}
          onRemove={idx > 0 ? () => onTabRemove(tab) : undefined}
        >
          {tab}
        </TabItem>
      ))}
      <button className={styles.AddButton} title="Add file" onClick={onTabAdd}>
        <PlusIcon />
      </button>
    </div>
  )
}

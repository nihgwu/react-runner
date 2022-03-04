import clsx from 'clsx'
import { GitHubLogoIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { ExampleSelect } from './ExamplesSelect'
import { ShareButton } from './ShareButton'
import { LayoutButton } from './LayoutButton'
import { ContrastButton } from './ContrastButton'
import { toggleTheme } from '../utils/theme'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.Header}>
      <h1 className={styles.Title}>
        <a className={styles.Link} href="/">
          React Runner
        </a>
      </h1>
      <ExampleSelect className={styles.Select} />
      <ShareButton className={styles.IconButton} />
      <LayoutButton className={styles.IconButtonRotate} />
      <ContrastButton className={styles.IconButtonRotate} />
      <button className={styles.IconButton} onClick={toggleTheme}>
        <MoonIcon data-hide="light" />
        <SunIcon data-hide="dark" />
      </button>
      <a
        className={clsx(styles.IconButton, styles.Link)}
        href="https://github.com/nihgwu/react-runner"
      >
        <GitHubLogoIcon />
      </a>
    </header>
  )
}

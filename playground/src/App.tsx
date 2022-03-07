import { useEffect, useState, useReducer, lazy } from 'react'

import { Header } from './components/Header'
import { TabBar } from './components/TabBar'
import { Preview } from './components/Preview'
import { ResizePane } from './components/ResizePane'
import { SafeSuspense } from './components/SafeSuspense'
import { getHash, getHashFiles, updateHash } from './utils/urlHash'
import { defaultHash } from './utils/defaultHash'
import styles from './App.module.css'

const Editor = lazy(() => import('./components/Editor'))

const supportedExts = ['js', 'jsx', 'ts', 'tsx', 'css']
const supportedExtsText = supportedExts.map((x) => `.${x}`).join(' ,')

function App() {
  // reset to clear editing history
  const [editorKey, resetEditor] = useReducer((state: number) => state + 1, 0)
  const [files, setFiles] = useState(getHashFiles)
  const filenames = Object.keys(files)
  const [currentFile, setCurrentFile] = useState(filenames[0])

  useEffect(() => {
    const handleChange = () => {
      setFiles(getHashFiles())
      resetEditor()
    }
    if (getHash() === undefined) {
      history.replaceState({}, '', `#${defaultHash}`)
      handleChange()
    }
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  useEffect(() => {
    if (!filenames.includes(currentFile)) setCurrentFile(filenames[0])
  }, [filenames.join('!')])

  return (
    <>
      <Header />
      <div className={styles.Body}>
        <ResizePane className={styles.EditorPane}>
          <TabBar
            className={styles.TabBar}
            tabs={filenames}
            activeTab={currentFile}
            onTabChange={setCurrentFile}
            onTabRemove={(tab) => {
              const idx = filenames.indexOf(tab)
              const newFiles = Object.fromEntries(
                filenames.filter((x) => x !== tab).map((x) => [x, files[x]])
              )
              updateHash(newFiles)
              setFiles(newFiles)
              if (tab === currentFile) {
                setCurrentFile(filenames[idx - 1])
              }
            }}
            onTabAdd={() => {
              let name = window.prompt(
                `Add new file {${supportedExtsText}}`,
                `Tab${filenames.length}.tsx`
              )
              if (!name) return
              if (filenames.includes(name)) {
                window.alert(`File "${name}" already exists`)
                return
              }
              if (name.indexOf('.') > 0) {
                const ext = name.split('.').reverse()[0]
                if (!supportedExts.includes(ext)) {
                  window.alert(
                    `Only {${supportedExtsText}} files are supported`
                  )
                  return
                }
              } else {
                name += '.tsx'
              }

              const newFiles = { ...files, [name]: '' }
              updateHash(newFiles)
              setFiles(newFiles)
              setCurrentFile(name)
            }}
          />
          <SafeSuspense fallback={<div className={styles.Editor} />}>
            <Editor
              key={editorKey}
              className={styles.Editor}
              filename={currentFile}
              value={files[currentFile]}
              onChange={(code) => {
                const newFiles = { ...files, [currentFile]: code }
                updateHash(newFiles)
                setFiles(newFiles)
              }}
            />
          </SafeSuspense>
        </ResizePane>
        <div className={styles.PreviewPane}>
          <Preview files={files} />
        </div>
      </div>
    </>
  )
}

export default App

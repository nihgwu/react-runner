const reactScript = `/* esm.sh - react@17.0.2 */
export * from "https://cdn.esm.sh/v74/react@17.0.2/es2021/react.js";
export { default } from "https://cdn.esm.sh/v74/react@17.0.2/es2021/react.js";
`

const reactDOMScript = `/* esm.sh - react-dom@17.0.2 */
export * from "https://cdn.esm.sh/v74/react-dom@17.0.2/es2021/react-dom.js";
export { default } from "https://cdn.esm.sh/v74/react-dom@17.0.2/es2021/react-dom.js";`

const jsxRuntimeScript = `/* esm.sh - react@17.0.2/jsx-runtime */
export * from "https://cdn.esm.sh/v74/react@17.0.2/es2021/jsx-runtime.js";
export { default } from "https://cdn.esm.sh/v74/react@17.0.2/es2021/jsx-runtime.js";`

const createScriptResponse = (content) =>
  new Response(content, {
    headers: {
      'content-type': 'application/javascript; charset=utf-8',
    },
    status: 200,
  })

const shouldPatchReact = (url) =>
  /^https:\/\/cdn.esm.sh\/v74\/react@(?!17.0.2).*react.js$/.test(url)

const shoulePatchJsxRuntime = (url) =>
  /^https:\/\/cdn.esm.sh\/v74\/react@(?!17.0.2).*jsx-runtime.js$/.test(url)

const shouldPatchReactDom = (url) =>
  /^https:\/\/cdn.esm.sh\/v74\/react-dom@(?!17.0.2).*/.test(url)

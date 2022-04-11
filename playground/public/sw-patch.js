const createPatch = (url, pkg) => {
  const name = pkg.split('/')[0]
  const entry = `${pkg.split('/')[1] || name}.js`
  const target = `https://cdn.esm.sh/v77/${name}@17.0.2/es2021/${entry}`
  if (
    new RegExp(`^https://cdn.esm.sh/v\\d+/${name}@.*${entry}$`).test(url) &&
    url !== target
  ) {
    return new Response(
      `/* esm.sh lock ${pkg} to @17.0.2/es2021 */
export * from "${target}";
export { default } from "${target}"`,
      {
        headers: {
          'content-type': 'application/javascript; charset=utf-8',
        },
        status: 200,
      }
    )
  }
}

const packagesToPatch = [
  'react',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-dom',
  'react-dom/client',
  'react-dom/server',
  'react-dom/test-utils',
]

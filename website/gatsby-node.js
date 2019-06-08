const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-runner': path.resolve(__dirname, '../packages/react-runner/src'),
        'react-live-runner': path.resolve(
          __dirname,
          '../packages/react-live-runner/src'
        ),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
  })
}

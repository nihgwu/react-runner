module.exports = {
  pathPrefix: '/react-runner',
  siteMetadata: {
    title: 'Website for react-runner',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-142848497-1',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
  ],
}

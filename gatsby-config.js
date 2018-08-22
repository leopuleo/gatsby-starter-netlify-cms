require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Federico Giacone',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'federicogiaconeportfolio',
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => doc => {
          let rootLang = '/'
          if (doc.lang === 'en-gb') {
            rootLang = '/en/'
          }

          switch (doc.type) {
            case 'home':
              return `${rootLang}`
            case 'portfolio':
              return `${rootLang}portfolio/${doc.uid}/`
            default:
              return `${rootLang}${doc.uid}/`
          }
        },
        htmlSerializer: ({ node, key, value }) => (type, element, content, children) => {
          switch (element.type) {
            case 'strong':
              return `<strong class='font-sans-bold text-grey-darkest'>${children.join('')}</strong>`

            case 'em':
              return `<em class='font-sans-italic'>${children.join('')}</em>`

            case 'hyperlink':
              const target = element.data.target ? `target="${element.data.target}" rel="noopener"` : ''
              const linkUrl = element.data.url
              return `<a class='text-grey-darkest underline' ${target} href="${linkUrl}">${children.join('')}</a>`
          }
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ],
}

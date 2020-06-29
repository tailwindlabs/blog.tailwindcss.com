const { createLoader } = require('simple-functional-loader')
const rehypePrism = require('@mapbox/rehype-prism')
const visit = require('unist-util-visit')
const withPrefresh = require('@prefresh/next')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
}

module.exports = withPrefresh(
  withBundleAnalyzer({
    pageExtensions: ['js', 'jsx', 'mdx'],
    experimental: {
      modern: true,
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/img/[name].[hash].[ext]',
            },
          },
        ],
      })

      const mdx = [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            rehypePlugins: [
              rehypePrism,
              () => {
                return (tree) => {
                  visit(tree, 'element', (node, index, parent) => {
                    let [token, type] = node.properties.className || []
                    if (token === 'token') {
                      node.properties.className = [tokenClassNames[type]]
                    }
                  })
                }
              },
            ],
          },
        },
      ]

      config.module.rules.push({
        test: /\.mdx$/,
        oneOf: [
          {
            resourceQuery: /preview/,
            use: [
              ...mdx,
              createLoader(function (src) {
                if (src.includes('<!--more-->')) {
                  const [preview] = src.split('<!--more-->')
                  return this.callback(null, preview)
                }

                const [preview] = src.split('<!--/excerpt-->')
                return this.callback(null, preview.replace('<!--excerpt-->', ''))
              }),
            ],
          },
          {
            use: [
              ...mdx,
              createLoader(function (src) {
                const content = [
                  'import Post from "@/components/Post"',
                  'export { getStaticProps } from "@/getStaticProps"',
                  src,
                  'export default (props) => <Post meta={meta} {...props} />',
                ].join('\n')

                if (content.includes('<!--more-->')) {
                  return this.callback(null, content.split('<!--more-->').join('\n'))
                }

                return this.callback(null, content.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, ''))
              }),
            ],
          },
        ],
      })

      // https://github.com/developit/nextjs-preact-demo/blob/master/next.config.js
      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test: preactModules,
          })
          cacheGroups.commons.name = 'framework'
        } else {
          cacheGroups.preact = {
            name: 'commons',
            chunks: 'all',
            test: preactModules,
          }
        }
      }

      // Install webpack aliases:
      const aliases = config.resolve.alias || (config.resolve.alias = {})
      aliases.react = aliases['react-dom'] = 'preact/compat'

      // inject Preact DevTools
      if (options.dev && !options.isServer) {
        const entry = config.entry
        config.entry = () =>
          entry().then((entries) => {
            entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || [])
            return entries
          })
      }

      return config
    },
  })
)

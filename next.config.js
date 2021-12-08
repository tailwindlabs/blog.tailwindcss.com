const { createLoader } = require('simple-functional-loader')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withSyntaxHighlighting = require('./remark/withSyntaxHighlighting')
const withProse = require('./remark/withProse')

module.exports = withBundleAnalyzer({
  pageExtensions: ['js', 'jsx', 'mdx'],
  experimental: {
    modern: true,
  },
  images: {
    disableStaticImages: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://tailwindcss.com/blog',
        permanent: true,
      },
      {
        source: '/building-react-and-vue-support-for-tailwind-ui',
        destination: 'https://tailwindcss.com/blog/building-react-and-vue-support-for-tailwind-ui',
        permanent: true,
      },
      {
        source: '/building-the-tailwind-blog',
        destination: 'https://tailwindcss.com/blog/building-the-tailwind-blog',
        permanent: true,
      },
      {
        source: '/designing-tailwind-ui-ecommerce',
        destination: 'https://tailwindcss.com/blog/designing-tailwind-ui-ecommerce',
        permanent: true,
      },
      {
        source: '/from-900-to-1-how-we-hired-robin-malfait',
        destination: 'https://tailwindcss.com/blog/from-900-to-1-how-we-hired-robin-malfait',
        permanent: true,
      },
      {
        source: '/headless-ui-unstyled-accessible-ui-components',
        destination: 'https://tailwindcss.com/blog/headless-ui-unstyled-accessible-ui-components',
        permanent: true,
      },
      {
        source: '/headless-ui-v1',
        destination: 'https://tailwindcss.com/blog/headless-ui-v1',
        permanent: true,
      },
      {
        source: '/headless-ui-v1-4',
        destination: 'https://tailwindcss.com/blog/headless-ui-v1-4',
        permanent: true,
      },
      {
        source: '/heroicons-v1',
        destination: 'https://tailwindcss.com/blog/heroicons-v1',
        permanent: true,
      },
      {
        source: '/introducing-heroicons',
        destination: 'https://tailwindcss.com/blog/introducing-heroicons',
        permanent: true,
      },
      {
        source: '/introducing-linting-for-tailwindcss-intellisense',
        destination:
          'https://tailwindcss.com/blog/introducing-linting-for-tailwindcss-intellisense',
        permanent: true,
      },
      {
        source: '/introducing-tailwind-play',
        destination: 'https://tailwindcss.com/blog/introducing-tailwind-play',
        permanent: true,
      },
      {
        source: '/just-in-time-the-next-generation-of-tailwind-css',
        destination:
          'https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css',
        permanent: true,
      },
      {
        source: '/multi-line-truncation-with-tailwindcss-line-clamp',
        destination:
          'https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp',
        permanent: true,
      },
      {
        source: '/simon-vrachliotis-joins-tailwind-labs',
        destination: 'https://tailwindcss.com/blog/simon-vrachliotis-joins-tailwind-labs',
        permanent: true,
      },
      {
        source: '/tailwind-ui-ecommerce',
        destination: 'https://tailwindcss.com/blog/tailwind-ui-ecommerce',
        permanent: true,
      },
      {
        source: '/tailwind-ui-now-with-react-and-vue-support',
        destination: 'https://tailwindcss.com/blog/tailwind-ui-now-with-react-and-vue-support',
        permanent: true,
      },
      {
        source: '/tailwindcss-1-5',
        destination: 'https://tailwindcss.com/blog/tailwindcss-1-5',
        permanent: true,
      },
      {
        source: '/tailwindcss-1-6',
        destination: 'https://tailwindcss.com/blog/tailwindcss-1-6',
        permanent: true,
      },
      {
        source: '/tailwindcss-1-7',
        destination: 'https://tailwindcss.com/blog/tailwindcss-1-7',
        permanent: true,
      },
      {
        source: '/tailwindcss-1-8',
        destination: 'https://tailwindcss.com/blog/tailwindcss-1-8',
        permanent: true,
      },
      {
        source: '/tailwindcss-1-9',
        destination: 'https://tailwindcss.com/blog/tailwindcss-1-9',
        permanent: true,
      },
      {
        source: '/tailwindcss-2-1',
        destination: 'https://tailwindcss.com/blog/tailwindcss-2-1',
        permanent: true,
      },
      {
        source: '/tailwindcss-2-2',
        destination: 'https://tailwindcss.com/blog/tailwindcss-2-2',
        permanent: true,
      },
      {
        source: '/tailwindcss-from-zero-to-production',
        destination: 'https://tailwindcss.com/blog/tailwindcss-from-zero-to-production',
        permanent: true,
      },
      {
        source: '/tailwindcss-typography',
        destination: 'https://tailwindcss.com/blog/tailwindcss-typography',
        permanent: true,
      },
      {
        source: '/tailwindcss-v2',
        destination: 'https://tailwindcss.com/blog/tailwindcss-v2',
        permanent: true,
      },
      {
        source: '/utility-friendly-transitions-with-tailwindui-react',
        destination:
          'https://tailwindcss.com/blog/utility-friendly-transitions-with-tailwindui-react',
        permanent: true,
      },
      {
        source: '/welcoming-brad-cornes-to-the-tailwind-team',
        destination: 'https://tailwindcss.com/blog/welcoming-brad-cornes-to-the-tailwind-team',
        permanent: true,
      },
      {
        source: '/welcoming-david-luhr-to-tailwind-labs',
        destination: 'https://tailwindcss.com/blog/welcoming-david-luhr-to-tailwind-labs',
        permanent: true,
      },
      {
        source: '/welcoming-james-mcdonald-to-tailwind-labs',
        destination: 'https://tailwindcss.com/blog/welcoming-james-mcdonald-to-tailwind-labs',
        permanent: true,
      },
      {
        source: '/whats-new-in-tailwindcss-on-youtube',
        destination: 'https://tailwindcss.com/blog/whats-new-in-tailwindcss-on-youtube',
        permanent: true,
      },
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: [withProse, withSyntaxHighlighting],
        },
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          test: /snippets/,
          use: mdx,
        },
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
          resourceQuery: /rss/,
          use: mdx,
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import Post from "@/components/Post"',
                'export { getStaticProps } from "@/getStaticProps"',
                src,
                'export default Post',
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

    if (!options.dev && options.isServer) {
      const originalEntry = config.entry

      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries['scripts/build-rss'] = './scripts/build-rss.js'
        return entries
      }
    }

    return config
  },
})

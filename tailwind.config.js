const defaultTheme = require('tailwindcss/defaultTheme')
const mdx = require('@mdx-js/mdx')

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.{js,mdx}', './next.config.js'],
    options: {
      extractors: [
        {
          extensions: ['mdx'],
          extractor: (content) => {
            content = mdx.sync(content)

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

            return broadMatches.concat(innerMatches)
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      typography: {
        bullets: 'line',
        linkColor: [
          '#bada55',
          {
            hover: '#facade',
          },
        ],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
          },
        },
      ])

      addComponents({
        '.prose': {
          '> :first-child': {
            marginTop: '0',
          },
          '> :last-child': {
            marginBottom: '0',
          },

          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.7'),
          color: theme('colors.gray.700'),
          p: {
            marginTop: theme('spacing.5'),
            marginBottom: theme('spacing.5'),
          },
          h2: {
            marginTop: theme('spacing.12'),
            marginBottom: theme('spacing.6'),
            fontSize: theme('fontSize.2xl'),
            fontWeight: '700',
            lineHeight: theme('lineHeight.8'),
            letterSpacing: theme('letterSpacing.tight'), // Consider removing
            color: theme('colors.gray.900'),
          },
          h3: {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.3'),
            fontSize: theme('fontSize.xl'),
            fontWeight: '600',
            lineHeight: theme('lineHeight.8'),
            color: theme('colors.gray.900'),
          },
          'h3 + *': {
            marginTop: '0',
          },
          ol: {
            counterReset: 'list-counter',
            marginTop: theme('spacing.5'),
            marginBottom: theme('spacing.5'),
          },
          ul: {
            marginTop: theme('spacing.5'),
            marginBottom: theme('spacing.5'),
          },
          li: {
            marginTop: theme('spacing.2'),
            marginBottom: theme('spacing.2'),
          },
          'ol li': {
            position: 'relative',
            counterIncrement: 'list-counter',
            paddingLeft: theme('spacing.8'),
          },
          'ol li:before': {
            content: 'counter(list-counter) "."',
            position: 'absolute',
            left: '0',
            fontWeight: '600',
            color: theme('colors.gray.500'),
          },
          'ul li': {
            position: 'relative',
            paddingLeft: theme('spacing.8'),
          },
          'ul li:before': {
            content: '""',
            position: 'absolute',
            top: 'calc(0.875em - 0.0625em)',
            left: '0',
            backgroundColor: theme('colors.gray.400'),
            height: '0.125em',
            width: '0.75em',
          },
          img: {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
          },
          video: {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
          },
          figure: {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
          },
          code: {
            fontSize: theme('fontSize.sm'),
            lineHeight: theme('lineHeight.7'),
            fontFamily: theme('fontFamily.mono').join(', '),
            color: theme('colors.gray.700'),
            backgroundColor: theme('colors.gray.50'),
            borderColor: theme('colors.gray.200'),
            borderWidth: theme('borderWidth.default'),
            borderRadius: theme('borderRadius.md'),
            paddingTop: theme('spacing.1'),
            paddingRight: theme('spacing[1.5]'),
            paddingBottom: theme('spacing.1'),
            paddingLeft: theme('spacing[1.5]'),
          },
          a: {
            color: theme('colors.gray.900'),
            textDecoration: 'underline',
          },
          pre: {
            color: theme('colors.gray.200'),
            fontSize: theme('fontSize.sm'),
            fontFamily: theme('fontFamily.mono').join(', '),
            lineHeight: theme('lineHeight.6'),
            borderRadius: theme('borderRadius.md'),
            backgroundColor: theme('colors.gray.800'),
            paddingTop: theme('spacing.3'),
            paddingRight: theme('spacing.4'),
            paddingBottom: theme('spacing.3'),
            paddingLeft: theme('spacing.4'),
            overflowX: 'auto',
          },
          'pre code': {
            backgroundColor: 'transparent',
            borderWidth: '0',
            borderRadius: '0',
            padding: '0',
            color: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            lineHeight: 'inherit',
          },
        },
      })
    },
  ],
}

const visit = require('unist-util-visit')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
loadLanguages()
require('./vendor/prism-diff-highlight')(Prism)

function highlightCode(code, prismLanguage) {
  const isDiff = prismLanguage.startsWith('diff-')
  const language = isDiff ? prismLanguage.substr(5) : prismLanguage
  const grammar = Prism.languages[isDiff ? 'diff' : language]
  if (!grammar) {
    console.warn(`Unrecognised language: ${prismLanguage}`)
    return Prism.util.encode(code)
  }
  let highlighted = Prism.highlight(code, grammar, prismLanguage)

  return language === 'html'
    ? highlighted.replace(
        /\*\*(.*?)\*\*/g,
        (_, text) => `<span class="code-highlight bg-code-highlight">${text}</span>`
      )
    : highlighted
}

module.exports = function withSyntaxHighlighting() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang !== null) {
        node.type = 'html'
        node.value = [
          `<pre class="language-${node.lang}">`,
          `<code class="language-${node.lang}">`,
          highlightCode(node.value, node.lang),
          '</code>',
          '</pre>',
        ]
          .filter(Boolean)
          .join('')
      }
    })
  }
}

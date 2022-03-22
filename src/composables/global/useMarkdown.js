import MarkdownIt from 'markdown-it'
import pangu from 'markdown-it-pangu'
import prism from 'markdown-it-prism'

export default (resultText) => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render(resultText)
}
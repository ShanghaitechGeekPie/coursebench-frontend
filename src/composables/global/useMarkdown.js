import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'

export default (content) => {
  const parser = new MarkdownIt()
  parser.use(prism)
  return parser.render(content)
}
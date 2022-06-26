import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'
import pangu from 'markdown-it-pangu'

export default (content) => {
    const parser = new MarkdownIt()
    parser.use(prism).use(pangu)
    return parser.render(content)
}
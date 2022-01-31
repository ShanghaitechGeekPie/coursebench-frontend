import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'
import '@/styles/prism.css'
import '@/styles/prism.css'

export default (resultText) => {
    const parser = new MarkdownIt()
    parser.use(prism)
    return parser.render(resultText)
}
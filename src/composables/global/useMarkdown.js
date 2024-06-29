import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';
import pangu from 'markdown-it-pangu';

const parser = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
});

parser.use(prism).use(pangu);

export default (content) => {
  // parser.use(prism).use(pangu)
  return parser.render(content);
};

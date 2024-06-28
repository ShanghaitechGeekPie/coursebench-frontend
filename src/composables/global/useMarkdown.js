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

const parser_with_html = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
});

parser.use(prism).use(pangu);
parser_with_html.use(prism).use(pangu);

const useMarkdown = (content) => {
  // parser.use(prism).use(pangu)
  return parser.render(content);
};

const useMarkdownWithHTML = (content) => {
  return parser_with_html.render(content);
};

export { useMarkdown, useMarkdownWithHTML };

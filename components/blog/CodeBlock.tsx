import CopyButton from './CopyButton'

type Lang = 'swift' | 'ts' | 'bash' | 'text'

const KEYWORDS: Record<Lang, string[]> = {
  swift: ['import', 'let', 'var', 'func', 'return', 'if', 'else', 'guard', 'for', 'in', 'while', 'switch', 'case', 'default', 'struct', 'class', 'enum', 'extension', 'protocol', 'private', 'public', 'static', 'self', 'Self', 'try', 'await', 'async', 'throws', 'some', 'nil', 'true', 'false', 'where', 'init', 'do', 'catch'],
  ts: ['import', 'export', 'from', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'of', 'in', 'while', 'switch', 'case', 'default', 'class', 'interface', 'type', 'new', 'await', 'async', 'null', 'undefined', 'true', 'false', 'try', 'catch'],
  bash: ['cd', 'npm', 'npx', 'git', 'export', 'echo', 'sudo'],
  text: [],
}

// One pass: comments, strings, @attributes, numbers, words. Only bash treats # as a comment.
const REST = String.raw`|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\`(?:\\.|[^\`\\])*\`)|(@\w+)|(\b\d[\d_.]*\b)|(\b[A-Za-z_]\w*\b)`
const tokenRe = (lang: Lang) => new RegExp((lang === 'bash' ? String.raw`(#[^\n]*)` : String.raw`(\/\/[^\n]*|\/\*[\s\S]*?\*\/)`) + REST, 'g')

function highlight(code: string, lang: Lang): React.ReactNode[] {
  if (lang === 'text') return [code]
  const kw = new Set(KEYWORDS[lang])
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  const re = tokenRe(lang)
  while ((m = re.exec(code))) {
    const [tok, comment, str, attr, num, word] = m
    let cls: string | null = null
    if (comment) cls = 'tok-comment'
    else if (str) cls = 'tok-string'
    else if (attr) cls = 'tok-keyword'
    else if (num) cls = 'tok-number'
    else if (word && kw.has(word)) cls = 'tok-keyword'
    else if (word && /^[A-Z]/.test(word)) cls = 'tok-type'
    else if (word && code[m.index - 1] === '.') cls = 'tok-member'
    if (!cls) continue
    if (m.index > last) out.push(code.slice(last, m.index))
    out.push(<span key={k++} className={cls}>{tok}</span>)
    last = m.index + tok.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

const LABEL: Record<Lang, string> = { swift: 'Swift', ts: 'TypeScript', bash: 'Terminal', text: 'Text' }

/** A Notion-style code block for devlog posts: label or filename, copy button, light syntax colours. */
export default function CodeBlock({ code, lang = 'swift', filename }: { code: string; lang?: Lang; filename?: string }) {
  const src = code.replace(/^\n+|\s+$/g, '')
  return (
    <figure className="code-block rounded-[6px] border border-border overflow-hidden">
      <figcaption className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-border text-[12px] text-faint">
        <span>{filename ?? LABEL[lang]}</span>
        <CopyButton text={src} />
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 text-[14px] leading-[1.7]">
        <code>{highlight(src, lang)}</code>
      </pre>
    </figure>
  )
}

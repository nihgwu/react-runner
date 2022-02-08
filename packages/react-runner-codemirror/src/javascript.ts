import {
  completeFromList,
  ifNotIn,
  Completion,
  snippetCompletion as snip,
} from '@codemirror/autocomplete'
import { LanguageSupport } from '@codemirror/language'
import { tsxLanguage, javascriptLanguage } from '@codemirror/lang-javascript'

const snippets: readonly Completion[] = [
  snip('try {\n\t${}\n} catch (${error}) {\n\t${}\n}', {
    label: 'try',
    detail: 'block',
    type: 'keyword',
  }),
  snip("import { ${names} } from '${module}'\n${}", {
    label: 'import',
    detail: 'named',
    type: 'keyword',
  }),
  snip("import ${name} from '${module}'\n${}", {
    label: 'import',
    detail: 'default',
    type: 'keyword',
  }),
  snip('export default function ${App}() {\n\t${}\n}', {
    label: 'export',
    detail: 'default',
    type: 'keyword',
  }),
]

export const javascript = () =>
  new LanguageSupport(
    tsxLanguage,
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(
        ['LineComment', 'BlockComment', 'String'],
        completeFromList(snippets)
      ),
    })
  )

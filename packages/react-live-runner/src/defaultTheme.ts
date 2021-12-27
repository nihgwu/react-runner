import { Theme } from './types'

const colors = {
  white: '#ffffff',
  dark: '#282c34',
  char: '#d8dee9',
  comment: '#b2b2b2',
  keyword: '#c5a5c5',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#88c6Be',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#fac863',
  method: '#6699cc',
  operator: '#fc929e',
}

const theme: Theme = {
  plain: {
    color: colors.white,
    backgroundColor: colors.dark,
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: colors.comment,
      },
    },
    {
      types: [
        'property',
        'number',
        'function-name',
        'constant',
        'symbol',
        'deleted',
      ],
      style: {
        color: colors.comment,
      },
    },
    {
      types: ['boolean'],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ['tag'],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ['string'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: colors.punctuation,
      },
    },
    {
      types: ['selector', 'char', 'builtin', 'inserted'],
      style: {
        color: colors.char,
      },
    },
    {
      types: ['function'],
      style: {
        color: colors.function,
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ['class-name'],
      style: {
        color: colors.className,
      },
    },
    {
      types: ['important'],
      style: {
        fontWeight: '400',
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: '700',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
}

export default theme

const TicTacToeMap = import.meta.glob('./TicTacToe/*', {
  assert: { type: 'raw' },
})

export const TicTacToe = Object.entries(TicTacToeMap).map(
  ([name, content]) => ({ name: name.replace('./TicTacToe/', ''), content })
) as unknown as { name: string; content: string }[]

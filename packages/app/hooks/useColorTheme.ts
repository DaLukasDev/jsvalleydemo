import { useState } from 'react'

export const useColorTheme = () => {
  const colors = ['pink', 'green', 'blue', 'red', 'purple', 'orange', 'yellow'] as const
  type TColors = (typeof colors)[number]

  const [theme, setTheme] = useState<TColors>('red')
  return { theme, setTheme, colors }
}

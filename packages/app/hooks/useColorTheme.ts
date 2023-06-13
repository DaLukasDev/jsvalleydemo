import { useState } from 'react'

export type TColors = (typeof colors)[number]
const colors = ['pink', 'green', 'blue', 'red', 'purple', 'orange', 'yellow'] as const
export const useColorTheme = () => {
  const [theme, setTheme] = useState<TColors>('red')
  return { theme, setTheme, colors }
}

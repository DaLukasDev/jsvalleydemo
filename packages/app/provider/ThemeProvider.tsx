import { Theme } from '@my/ui'
import { FC, ReactNode, createContext, useContext, useState } from 'react'

export type TColors = (typeof colors)[number]
export const colors = ['pink', 'green', 'blue', 'red', 'purple', 'orange', 'yellow'] as const

interface IThemeContext {
  currentTheme: TColors
  setTheme: (theme: TColors) => void
  colors: readonly TColors[]
}

const defaultState: IThemeContext = {
  currentTheme: 'pink',
  setTheme: (theme: TColors) => {},
  colors: colors,
}

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<TColors>('blue')

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        setTheme,
        colors,
      }}
    >
      <Theme name={theme}>{children}</Theme>
    </ThemeContext.Provider>
  )
}

const ThemeContext = createContext<IThemeContext>(defaultState)
export const useThemeContext = () => useContext(ThemeContext)

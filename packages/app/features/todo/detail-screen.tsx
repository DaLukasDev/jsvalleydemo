import { Button, Circle, Paragraph, Spinner, XStack, YStack } from '@my/ui'
import { Check, ChevronLeft, RefreshCw, X } from '@tamagui/lucide-icons'
import { useTodo } from 'app/hooks/useTodo'
import { useToggleCompleted } from 'app/hooks/useToggleCompleted'
import { useThemeContext } from 'app/provider/ThemeProvider'
import React, { useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

export function TodoDetailScreen() {
  const [id] = useParam('id')
  const { colors, setTheme, currentTheme: theme } = useThemeContext()
  const { updateTodo, isUpdating } = useToggleCompleted()
  const link = useLink({
    href: '/',
  })

  const { isLoading, refetch, todo } = useTodo(id)

  const handleToggle = async () => {
    if (todo) {
      await updateTodo(todo.id, !todo.isCompleted)
      refetch()
    }
  }

  useEffect(() => void refetch(), [id])

  return (
    <YStack f={1} jc="center" ai="center" space backgroundColor="$background">
      <YStack>
        {isLoading || !todo ? (
          <Spinner size="large" color={`$${theme}5`} />
        ) : (
          <YStack gap="$1.5" ai={'center'}>
            <Paragraph ta="center" fow="700">
              {todo.text}
            </Paragraph>
            <Paragraph ta="center" fow="700">
              is completed:
            </Paragraph>
            {todo.isCompleted ? <Check color="green" /> : <X color="red" />}
            <XStack gap="$4">
              <Button size="$6" icon={RefreshCw} circular onPress={() => refetch()} />
              <Button
                size="$6"
                icon={todo?.isCompleted ? <X color="red" /> : <Check color="green" />}
                circular
                onPress={handleToggle}
              />
            </XStack>
          </YStack>
        )}
      </YStack>

      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
      <XStack gap="$1.5">
        {colors.map((c) => (
          <Button key={c} onPress={() => setTheme(c)}>
            <Circle backgroundColor={c} size={10} />
          </Button>
        ))}
      </XStack>
    </YStack>
  )
}

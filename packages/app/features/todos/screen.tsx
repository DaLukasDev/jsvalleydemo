import {
  Button,
  Circle,
  H1,
  H3,
  Input,
  Paragraph,
  Separator,
  Sheet,
  Spinner,
  Theme,
  XStack,
  YStack,
  useToastController,
} from '@my/ui'
import { ChevronDown, Plus, RefreshCw } from '@tamagui/lucide-icons'
import { TColors, useColorTheme } from 'app/hooks/useColorTheme'
import { useCreateTodo } from 'app/hooks/useCreateTodo'
import { useTodos } from 'app/hooks/useTodos'
import React, { useState } from 'react'
import { useRouter } from 'solito/router'
export function TodoScreen() {
  const { isLoading, todos, refetch } = useTodos()
  const router = useRouter()
  const { colors, setTheme, theme } = useColorTheme()
  return (
    <Theme name={theme}>
      <YStack f={1} jc="center" ai="center" p="$4" space backgroundColor="$background">
        <YStack space="$4" maw={600}>
          <H1 ta="center">Hi JSValley!</H1>
          <Separator />
          <Paragraph ta="center">Your tasks for today:</Paragraph>
        </YStack>

        {isLoading ? (
          <Spinner size="large" color={`$${theme}5`} />
        ) : (
          todos?.map((t) => (
            <XStack key={t.id}>
              <Button
                onPress={() => router.push(`/todo/${t.id}`)}
                href={`/todo/${t.id}`}
                accessibilityRole="link"
                style={{
                  textDecoration: 'none',
                }}
              >
                {t.text}
              </Button>
            </XStack>
          ))
        )}
        <XStack gap="$4">
          <Button size="$6" icon={RefreshCw} circular onPress={() => refetch()} />
          <SheetDemo refetch={refetch} theme={theme} />
        </XStack>
        <XStack gap="$1.5">
          {colors.map((c) => (
            <Button key={c} onPress={() => setTheme(c)}>
              <Circle backgroundColor={c} size={10} />
            </Button>
          ))}
        </XStack>
      </YStack>
    </Theme>
  )
}

function SheetDemo(props: { refetch: () => void; theme: TColors }) {
  const [open, setOpen] = useState(false)
  const [todoText, setTodoText] = useState('')
  const [position, setPosition] = useState(0)
  const { createTodo, isCreating } = useCreateTodo()
  const toast = useToastController()
  const handleTextChange = (text: string) => setTodoText(text)
  const handleSaveTodo = async () => {
    await createTodo(todoText)
    props.refetch()
    setOpen((x) => !x)
    toast.show('Todo created!', {
      message: 'Added your todo to the list!',
    })
    setTodoText('')
  }
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : Plus}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="space-around">
          <Sheet.Handle />
          <YStack space="$4" maw={600}>
            <H3 ta="center">Add a new todo:</H3>
            {isCreating ? (
              <Spinner size="large" color={`$${props.theme}5`} />
            ) : (
              <YStack space="$4">
                <Input onChangeText={handleTextChange} value={todoText} />
                <Button onPress={handleSaveTodo}>Save</Button>
              </YStack>
            )}
          </YStack>
          <Button
            size="$4"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

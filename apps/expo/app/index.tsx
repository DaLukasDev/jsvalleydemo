import { TodoScreen } from 'app/features/todos/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <TodoScreen />
    </>
  )
}

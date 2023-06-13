import { UserDetailScreen } from 'app/features/todo/detail-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo',
        }}
      />
      <UserDetailScreen />
    </>
  )
}

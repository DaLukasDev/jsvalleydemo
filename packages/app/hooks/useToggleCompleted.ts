import pb from 'app/libs/pocketbase'
import { useState } from 'react'

export const useToggleCompleted = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateTodo = async (id: string, isCompleted: boolean) => {
    setIsUpdating(true)
    await pb.collection('todos').update(id, { isCompleted })

    setIsUpdating(false)
  }
  return { isUpdating, updateTodo }
}

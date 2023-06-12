import pb from 'app/libs/pocketbase'
import { useState } from 'react'

export const useCreateTodo = () => {
  const [isCreating, setIsCreating] = useState(false)

  const createTodo = async (text: string) => {
    setIsCreating(true)
    await pb.collection('todos').create({ text })

    setIsCreating(false)
  }
  return { isCreating, createTodo }
}

import pb from 'app/libs/pocketbase'
import { useEffect, useState } from 'react'

type Todo = {
  collectionId: string
  collectionName: string
  created: string
  id: string
  isCompleted: boolean
  text: string
  updated: string
}
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const getTodos = async () => {
    setIsLoading(true)
    const todos = await pb.collection('todos').getFullList<Todo>()
    setTodos(todos)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const refetch = () => getTodos()
  useEffect(() => void refetch(), [])
  return { todos, isLoading, refetch }
}

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
export const useTodo = (id?: string) => {
  const [todo, setTodo] = useState<Todo | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const getTodo = async () => {
    setIsLoading(true)
    if (!id) return
    const todo = await pb.collection('todos').getOne<Todo>(id)
    setTodo(todo)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const refetch = () => getTodo()
  useEffect(() => void refetch(), [])
  return { todo, isLoading, refetch }
}

import { TodoDetailScreen } from 'app/features/todo/detail-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <TodoDetailScreen />
    </>
  )
}

import { TodoScreen } from 'app/features/todos/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Todos</title>
      </Head>
      <TodoScreen />
    </>
  )
}

import React from 'react'
import { useMachine } from '@xstate/react'

import Todo from './Todo'
import * as todos from './machines/todos'

const Todos: React.FC<unknown> = () => {
  const todosMachine = todos.machine.withContext({
    todos: []
  })
  const [current, send] = useMachine(todosMachine, todos.options)
  const { todos: todoRefs } = current.context

  console.log(current)

  return (
    <div>
      <h1>Simple Todo List</h1>
      <button onClick={() => send({ type: 'TODOS.ADD', value: 'foo' })}>+</button>
      {todoRefs?.map((todo, index) => <Todo key={todo.id} todoRef={todo} />)}
    </div>
  )
}

export default Todos

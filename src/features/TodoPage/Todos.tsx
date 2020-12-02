import React from 'react'
import { useMachine } from '@xstate/react'

import TodosComponent from '../../components/Todos'
import Todo from './Todo'
import * as todos from './machines/todos'

const Todos: React.FC<unknown> = () => {
  const todosMachine = todos.machine.withContext({
    todos: []
  })
  const [current, send] = useMachine(todosMachine, todos.options)
  const { todos: todoRefs } = current.context
  const status = current.matches('init') ? 'loading...' :
    current.matches('ready.saving') ? 'saving...' : '';
  const diabledAddButton = current.matches('init')

  return (
    <TodosComponent disableAddButton={diabledAddButton} status={status} onClickAdd={() => send({ type: 'TODOS.ADD', value: 'foo' })}>
      {todoRefs?.map((todo, index) => <Todo key={todo.id} todoRef={todo} />)}
    </TodosComponent>
  )
}

export default Todos

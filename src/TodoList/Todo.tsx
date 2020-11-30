import React from 'react'
import { Actor, State } from 'xstate'
import { useActor } from '@xstate/react'

import * as todo from './machines/todo'

export type Props = {
  todoRef: Actor<State<todo.Context, todo.Events, todo.States>, todo.Events>
}

const Todo: React.FC<Props> = ({ todoRef }: Props) => {
  const [current, send] = useActor<todo.Events, State<todo.Context, todo.Events, todo.States>>(todoRef as Actor)
  const { value, completed } = current.context

  return (
    <div>
      <input type="checkbox" value={completed ? 1 : 0} onChange={(e) => send({ type: 'CHANGE_COMPLETE', value: parseInt(e.target.value, 10) === 1 })} />
      <input type="text" value={value} onFocus={() => send({ type: 'EDIT' })} onChange={(e) => send({ type: 'CHANGE', value: e.target.value })} onBlur={() => send({ type: 'BLUR' })} />
      <button onClick={() => send({ type: 'DELETE' })}>-</button>
    </div>
  )
}

export default Todo;

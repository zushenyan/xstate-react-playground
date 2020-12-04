import React from 'react';
import { Actor, State } from 'xstate';
import { useActor } from '@xstate/react';

import TodoComponent from '../../components/Todo';
import * as todo from './machines/todo';

export type Props = {
  todoRef: Actor<State<todo.Context, todo.Events, todo.States>, todo.Events>;
};

const Todo: React.FC<Props> = ({ todoRef }: Props) => {
  const [current, send] = useActor<
    todo.Events,
    State<todo.Context, todo.Events, todo.States>
  >(todoRef as Actor);
  const { value, completed } = current.context;

  return (
    <TodoComponent
      completed={completed ? 1 : 0}
      onChangeCompleted={(e) =>
        send({
          type: 'CHANGE_COMPLETE',
          value: parseInt(e.target.value, 10) === 1 ? false : true,
        })
      }
      value={value}
      onFocusInput={() => send({ type: 'EDIT' })}
      onChangeInput={(e) => send({ type: 'CHANGE', value: e.target.value })}
      onBlurInput={() => send({ type: 'BLUR' })}
      onDelete={() => send({ type: 'DELETE' })}
    />
  );
};

export default Todo;

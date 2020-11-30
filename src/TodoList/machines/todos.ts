/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import { Machine, MachineOptions, Actor, State, assign, spawn } from 'xstate';
import { v4 as uuid } from 'uuid';

import * as todo from './todo';

export interface Context {
  todos: Actor<State<todo.Context, todo.Events, todo.States>, todo.Events>[];
}

export interface States {
  states: {
    init: Record<string, unknown>;
    ready: Record<string, unknown>;
    error: Record<string, unknown>;
  };
}

type AddEvent = { type: 'TODOS.ADD'; value: string };
type DeleteEvent = { type: 'TODOS.DELETE'; id: string };
export type Events = AddEvent | DeleteEvent;

export const machine = Machine<Context, States, Events>({
  initial: 'init',
  states: {
    init: {
      invoke: {
        id: 'loadTodos',
        src: 'initTodos',
        onDone: 'ready',
        onError: 'error',
      },
    },
    ready: {
      on: {
        'TODOS.ADD': {
          actions: ['add'],
        },
        'TODOS.DELETE': {
          actions: ['delete'],
        },
      },
    },
    error: {},
  },
});

export const options: MachineOptions<Context, Events> = {
  actions: {
    add: assign<Context, AddEvent>({
      todos: (context, event) => {
        const id = uuid();
        const service = todo.machine.withConfig(todo.options).withContext({
          id,
          value: event.value,
          completed: false,
        });
        return [...context.todos, spawn(service, id)];
      },
    }) as any,
    delete: assign<Context, DeleteEvent>({
      todos: (context, event) =>
        context.todos.filter((todo) => todo.id !== event.id),
    }) as any,
  },
  guards: {},
  activities: {},
  services: {
    initTodos: (): Promise<undefined> =>
      new Promise((res) => {
        setTimeout(res, 1000);
      }),
  },
  delays: {},
};

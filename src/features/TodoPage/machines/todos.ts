/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import {
  Machine,
  MachineOptions,
  Actor,
  State,
  assign,
  spawn,
  DoneInvokeEvent,
} from 'xstate';
import { v4 as uuid } from 'uuid';

import * as todo from './todo';

export interface Context {
  todos: Actor<State<todo.Context, todo.Events, todo.States>, todo.Events>[];
}

export interface States {
  states: {
    init: Record<string, unknown>;
    ready: {
      states: {
        standby: Record<string, unknown>;
        saving: Record<string, unknown>;
      };
    };
    error: Record<string, unknown>;
  };
}

type AddEvent = { type: 'TODOS.ADD'; value: string };
type LoadEvent = { type: 'TODOS.LOAD'; value: todo.Context[] };
type DeleteEvent = { type: 'TODOS.DELETE'; id: string };
export type Events = AddEvent | DeleteEvent | LoadEvent;

export const machine = Machine<Context, States, Events>({
  initial: 'init',
  states: {
    init: {
      invoke: {
        id: 'loadTodos',
        src: 'loadTodos',
        onDone: {
          target: 'ready.standby',
          actions: ['initTodos'],
        },
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
      states: {
        standby: {
          // activity: [''],
        },
        saving: {},
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
    saveTodos: (context: Context): void => {
      const data = context.todos.map((todo) => todo.state.context);
      localStorage.setItem('todos', JSON.stringify(data));
    },
    initTodos: assign<Context, DoneInvokeEvent<todo.Context[]>>({
      todos: (_, event) => {
        return event.data.map((tc) =>
          spawn(todo.machine.withConfig(todo.options).withContext(tc), tc.id)
        );
      },
    }) as any,
  },
  guards: {},
  activities: {
    // saveTodos: () => {
    //   const interval = setInterval(() => undefined, 3000)
    //   return () => clearInterval(interval)
    // }
  },
  services: {
    loadTodos: (): Promise<todo.Context[]> => {
      return new Promise((res) => {
        setTimeout(() => {
          const rawData = localStorage.getItem('todos') || '[]';
          res(JSON.parse(rawData));
        }, 1000);
      });
    },
  },
  delays: {},
};

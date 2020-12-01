/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import { Machine, MachineOptions, assign, sendParent, sendUpdate } from 'xstate';

export interface Context {
  id: string;
  value: string;
  completed: boolean;
}

export interface States {
  states: {
    ready: Record<string, unknown>;
    editing: Record<string, unknown>;
  };
}

type ChangeCompleteEvent = { type: 'CHANGE_COMPLETE'; value: boolean };
type ChangeEvent = { type: 'CHANGE'; value: string };
type EditEvent = { type: 'EDIT' };
type BlurEvent = { type: 'BLUR' };
type DeleteEvent = { type: 'DELETE' };
export type Events =
  | ChangeCompleteEvent
  | ChangeEvent
  | EditEvent
  | BlurEvent
  | DeleteEvent;

export const machine = Machine<Context, States, Events>({
  initial: 'ready',
  on: {
    DELETE: {
      actions: ['delete'],
    },
  },
  states: {
    ready: {
      on: {
        CHANGE_COMPLETE: {
          target: 'ready',
          actions: ['changeComplete', 'syncWithParent'],
        },
        EDIT: 'editing',
      },
    },
    editing: {
      on: {
        CHANGE: {
          actions: ['change'],
        },
        BLUR: [
          {
            target: 'ready',
            actions: ['syncWithParent'],
            cond: 'notEmpty',
          },
          { actions: 'delete' },
        ],
      },
    },
  },
});

export const options: MachineOptions<Context, Events> = {
  actions: {
    changeComplete: assign<Context, ChangeCompleteEvent>({
      completed: (_, event) => event.value,
    }) as any,
    change: assign<Context, ChangeEvent>({
      value: (_, event) => event.value,
    }) as any,
    delete: sendParent((context: Context) => ({
      type: 'TODOS.DELETE',
      id: context.id,
    })),
    syncWithParent: sendUpdate()
  },
  guards: {
    notEmpty: (context: Context): boolean => context.value.trim().length > 0,
  },
  activities: {},
  services: {},
  delays: {},
};

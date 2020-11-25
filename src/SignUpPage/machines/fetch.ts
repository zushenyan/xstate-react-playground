/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import { Machine, assign, DoneInvokeEvent } from 'xstate';
import * as apis from './apis';

export interface Context extends apis.Resolve {
  error: string;
}

export interface StateSchema {
  states: {
    ready: Record<string, unknown>;
    loading: Record<string, unknown>;
    error: Record<string, unknown>;
    done: Record<string, unknown>;
  };
}

type ResolveEvent = DoneInvokeEvent<apis.Resolve>;
type RejectEvent = DoneInvokeEvent<string>;
export type Events = {
  type: 'START';
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const machine = Machine<Context, StateSchema, Events>(
  {
    key: 'fetch',
    initial: 'ready',
    context: {
      email: '',
      msg: '',
      error: '',
    },
    states: {
      ready: {
        on: {
          START: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'getData',
          src: 'submitUserData',
          onError: {
            target: 'error',
            actions: 'reject',
          },
          onDone: {
            target: 'done',
            actions: 'resolve',
          },
        },
      },
      error: {
        on: {
          START: 'loading',
        },
      },
      done: {
        on: {
          START: 'loading',
        },
      },
    },
  },
  {
    actions: {
      resolve: assign<Context, ResolveEvent>({
        email: (_, e) => e.data.email,
        msg: (_, e) => e.data.msg,
      }) as any,
      reject: assign<Context, RejectEvent>({
        error: (_, e) => e.data,
      }) as any,
    },
    services: {
      submitUserData: (ctx, event) =>
        apis.submitUserData(
          event.email,
          event.password,
          event.passwordConfirmation
        ),
    },
  }
);

export default machine;

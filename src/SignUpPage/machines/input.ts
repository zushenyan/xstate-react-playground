/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import { Machine, assign, sendParent, interpret } from 'xstate';

export interface Context {
  initialValue: string;
  value: string | number;
  name: string;
  touched: boolean;
}

export interface States {
  states: {
    ready: Record<string, unknown>;
  };
}

type ChangeEvent = { type: 'CHANGE'; value: string };
type BlurEvent = { type: 'BLUR' };
export type Events = ChangeEvent | BlurEvent;

export const input = Machine<Context, States, Events>(
  {
    id: 'input',
    initial: 'ready',
    context: {
      initialValue: '',
      value: '',
      name: '',
      touched: false,
    },
    states: {
      ready: {
        on: {
          CHANGE: { actions: ['change'] },
          BLUR: { actions: ['blur', 'validate'] },
        },
      },
    },
  },
  {
    actions: {
      change: assign<Context, ChangeEvent>({
        value: (_, e) => e.value,
      }) as any,
      blur: assign<Context>({
        touched: () => true,
      }) as any,
      validate: sendParent('VALIDATE'),
    },
  }
);

const service = interpret(input)
  .onTransition((s) => {
    console.log(s.value);
    console.log(s);
  })
  .start();

service.send({ type: 'CHANGE', value: 'foo' });

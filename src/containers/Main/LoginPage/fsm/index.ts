import { Machine, assign, MachineConfig } from 'xstate';
import {
  FormContext,
  EmailStates,
  PasswordStates,
  FormStates,
  EmailCacheEvent,
  PasswordCacheEvent,
  TFormEvents,
} from './definitions';

export const isEmpty = ({ email }: FormContext): boolean => !email;
export const badEmailFormat = ({ email }: FormContext): boolean =>
  !/^.+\@.+$/g.test(email);

export const cacheEmail = assign<FormContext, TFormEvents>({
  email: (context, event) => (event as EmailCacheEvent).payload,
});

export const cachePassword = assign<FormContext, TFormEvents>({
  password: (context, event) => (event as PasswordCacheEvent).payload,
});

const emailStates: MachineConfig<FormContext, EmailStates, TFormEvents> = {
  initial: 'noError',
  states: {
    noError: {},
    errors: {
      initial: 'empty',
      states: {
        empty: {},
        badFormat: {},
        noAccount: {},
      },
    },
  },
};

const passwordStates: MachineConfig<
  FormContext,
  PasswordStates,
  TFormEvents
> = {
  initial: 'noError',
  states: {
    noError: {},
    errors: {
      initial: 'empty',
      states: {
        empty: {},
      },
    },
  },
};

export const formMachine = Machine<FormContext, FormStates, TFormEvents>(
  {
    initial: 'ready',
    context: {
      email: '',
      password: '',
    },
    states: {
      ready: {
        type: 'parallel',
        on: {
          EMAIL_CACHE: {
            actions: 'cacheEmail',
            target: 'ready.email.noError',
          },
          EMAIL_VALIDATE_FRONTEND: [
            {
              cond: 'isEmpty',
              target: 'ready.email.errors.empty',
            },
            {
              cond: 'badEmailFormat',
              target: 'ready.email.errors.badFormat',
            },
          ],
          PASSWORD_CACHE: {
            actions: 'cachePassword',
            target: 'ready.password.noError',
          },
          PASSWORD_VALIDATE_FRONTEND: [
            {
              cond: 'isEmpty',
              target: 'ready.password.errors.empty',
            },
          ],
        },
        states: {
          email: emailStates,
          password: passwordStates,
        },
      },
    },
  },
  {
    actions: {
      cacheEmail,
      cachePassword,
    },
    guards: {
      isEmpty,
      badEmailFormat,
    },
  },
);

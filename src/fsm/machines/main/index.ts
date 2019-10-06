import { Machine } from 'xstate';
import { isEmpty, isTooShort } from '../guards';

export interface IMainContext {
  username: string
  password: string
}

export default Machine<IMainContext>({
  initial: "dataEntry",
  context: {
    username: "",
    password: ""
  },
  states: {
    dataEntry: {
      on: {
        ENTER_EMAIL: {
          actions: 'saveEmail'
        },
        ENTER_PASSWORD: {
          actions: 'savePassword',
        },
        BLUR_EMAIL: {
          target: 'emailError.',
        },
        BLUR_PASSWORD: {
          actions: ''
        },
        SUBMIT: {}
      }
    },
    emailError: {
      on: {
        
      }
    },
    passwordError: {},
    pending: {},
    done: {}
  }
});
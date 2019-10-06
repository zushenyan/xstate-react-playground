import { Machine } from 'xstate';

interface IInput {
  value: string,
}

export default Machine<IInput>(
  {
    initial: '',
    context: {
      value: ''
    },
    states: {
      noError: {},
      errors: {
        initial: 'empty',
        states: {
          empty: {},
          badFormat: {},
          noAccount: {},
        }
      }
    }
  },
  {
    actions: {
      
    }
  }
);
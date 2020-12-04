/* eslint-disable @typescript-eslint/no-explicit-any */
// to resolve this issue https://github.com/davidkpiano/xstate/issues/1198#issuecomment-632899035
import { Machine, MachineOptions, assign, send, actions } from 'xstate';

import * as apis from '../../../services/apis/reddit';

const { cancel } = actions;

export interface Context {
  keyword: string;
  subreddits?: apis.SearchSubredditResponse;
  users?: apis.SearchUserResponse;
}

export interface States {
  states: {
    ready: Record<string, unknown>;
    startSearching: Record<string, unknown>;
    searching: Record<string, unknown>;
    error: Record<string, unknown>;
  };
}

type TypeEvent = { type: 'TYPE'; query: string };
type SearchEvent = { type: 'SEARCH' };
type ErrorEvent = { type: 'ERROR' };
type SetDataEvent = {
  type: 'SET_DATA';
  data: [apis.SearchSubredditResponse, apis.SearchUserResponse];
};
export type Events = TypeEvent | SearchEvent | ErrorEvent;

export const machine = Machine<Context, States, Events>({
  initial: 'ready',
  on: {
    TYPE: {
      target: 'startSearching',
      actions: ['setKeyword'],
    },
    SEARCH: 'searching',
    ERROR: 'error',
  },
  states: {
    ready: {},
    startSearching: {
      entry: ['cancelDebouncedSearch', 'debouncedSearch'],
    },
    searching: {
      invoke: {
        id: 'searchAll',
        src: 'searchAll',
        onDone: {
          target: 'ready',
          actions: 'setData',
        },
        onError: 'error',
      },
    },
    error: {
      after: {
        3000: 'searching',
      },
    },
  },
});

export const options: MachineOptions<Context, Events> = {
  actions: {
    setKeyword: assign<Context, TypeEvent>({
      keyword: (_, event) => event.query,
    }) as any,
    cancelDebouncedSearch: cancel('debounced-search'),
    debouncedSearch: send('SEARCH', {
      delay: 1000,
      id: 'debounced-search',
    }),
    setData: assign<Context, SetDataEvent>({
      subreddits: (_, event) => event.data[0],
      users: (_, event) => event.data[1],
    }) as any,
  },
  guards: {},
  activities: {},
  services: {
    searchAll: (
      context: Context
    ): Promise<[apis.SearchSubredditResponse, apis.SearchUserResponse]> => {
      return Promise.all([
        apis.searchSubreddits(context.keyword),
        apis.searchUsers(context.keyword),
      ]);
    },
  },
  delays: {},
};

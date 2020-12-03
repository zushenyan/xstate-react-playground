import { MachineConfig, MachineOptions } from 'xstate';

export type Context = unknown;

export interface States {
  states: {
    todo: Record<string, unknown>;
    reddit: Record<string, unknown>;
  };
}

type TodoEvent = { type: 'TODO' };
type RedditEvent = { type: 'REDDIT' };
export type Events = TodoEvent | RedditEvent;

export const config: MachineConfig<Context, States, Events> = {
  initial: 'todo',
  on: {
    TODO: 'todo',
    REDDIT: 'reddit',
  },
  states: {
    todo: { meta: { path: '/todo' } },
    reddit: { meta: { path: '/reddit' } },
  },
};

export const options: MachineOptions<Context, Events> = {
  guards: {},
  actions: {},
  activities: {},
  services: {},
  delays: {},
};

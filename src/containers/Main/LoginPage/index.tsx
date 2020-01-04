import React, { FC } from 'react';
import { useMachine } from '@xstate/react';
import { formMachine } from './fsm';

const Main: FC = () => {
  const [formCurrent, send] = useMachine(formMachine);
  return (
    <div>
      <div>
        <input
          onChange={(event): void => {
            send({ type: 'EMAIL_CACHE', payload: event.target.value });
          }}
          onBlur={(): void => {
            send({ type: 'EMAIL_VALIDATE_FRONTEND' });
          }}
        />
        <div style={{ color: 'red' }}>
          {formCurrent.matches('ready.email.errors.empty')
            ? 'empty'
            : formCurrent.matches('ready.email.errors.badFormat')
            ? 'bad format'
            : ''}
        </div>
      </div>
      <div>
        <input
          onChange={(event): void => {
            send({ type: 'PASSWORD_CACHE', payload: event.target.value });
          }}
          onBlur={(): void => {
            send({ type: 'PASSWORD_VALIDATE_FRONTEND' });
          }}
        />
        <div style={{ color: 'red' }}>
          {formCurrent.matches('ready.password.errors.empty') && 'empty'}
        </div>
      </div>
    </div>
  );
};

export default Main;

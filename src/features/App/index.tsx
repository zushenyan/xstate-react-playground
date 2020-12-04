import React, { useState, useEffect } from 'react';
import { createHashHistory } from 'history';
import { StateValue, matchesState } from 'xstate'
import { routerMachine } from 'xstate-router';

import Todos from '../TodoPage'
import Reddit from '../RedditPage'

import * as router from './machines/router';

const service = routerMachine({
  config: router.config,
  options: router.options,
  initialContext: {},
  history: createHashHistory()
});

const getPage = (machineState: StateValue): React.ReactNode => {
  return matchesState(machineState, 'todo') ? <Todos /> : <Reddit />;
}

function App(): React.ReactElement {
  const [state, setState] = useState(service.state.value)

  useEffect(() => {
    service.onTransition((s) => setState(s.value));
  }, [])

  return (
    <div className="flex flex-col">
      <div className="py-6 flex justify-center items-center gap-x-10 text-xl">
        <button onClick={() => service.send('TODO')}>Todo</button>
        <button onClick={() => service.send('REDDIT')}>Reddit</button>
      </div>
      <div className="border-box px-52 space-y-2">
        {getPage(state)}
      </div>
    </div>
  );
}

export default App;

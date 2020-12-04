import React from 'react';

import Todos from './Todos';

const TodoPage: React.FC<unknown> = () => {
  const desc = `
    A simple todo list which you can:

    - add/remove items.
    - toggle completion for a todo item.
    - autosave every 5 seconds.
    - recover the state from the local storage.
  `

  return (
    <>
      <h1 className="text-4xl">Simple Todo List</h1>
      <pre>{desc}</pre>
      <Todos />
    </>
  );
};

export default TodoPage;

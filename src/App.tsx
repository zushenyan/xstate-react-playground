import React from 'react';
import Todos from './TodoList/Todos'

// interface UserResponse {
//   results: {
//     gender: string;
//     name: {
//       title: string;
//       first: string;
//       last: string;
//     }
//   }[];
//   info: {
//     seed: string;
//     results: number;
//     page: number;
//     version: string;
//   };
// }

// async function myFetch<T> (requestInfo: RequestInfo): Promise<T> {
//   const response = await fetch(requestInfo);
//   return await response.json();
// };

// (async () => {
//   const data: UserResponse = await myFetch('https://randomuser.me/api/');
//   console.log(data.results[0].name)
// })()

function App(): React.ReactElement {
  return (
    <Todos />
  );
}

export default App;

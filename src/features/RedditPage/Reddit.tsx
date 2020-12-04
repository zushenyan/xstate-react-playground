import React from 'react'
import { useMachine } from '@xstate/react'

import SearchResult from '../../components/SearchResult'
import * as search from './machines/search'

const renderGuard = (nodes: React.ReactNode[] = []) => nodes.length > 0 ? nodes : 'No search result.'

const Reddit: React.FC<unknown> = () => {
  const searchMachine = search.machine.withContext({
    keyword: '',
  })
  const [current, send] = useMachine(searchMachine, search.options)
  const { keyword, subreddits, users } = current.context;

  const isSearching = current.matches('searching') || current.matches('startSearching')

  const subredditsNodes = subreddits?.data?.children?.map((c) => <div key={c.data.title}>{c.data.title}</div>)
  const usersNodes = users?.data?.children?.map((c) => <div key={c.data.name}>{c.data.name}</div>);

  return (
    <div className="border-box flex flex-col space-y-8">
      <div className="border-box flex space-x-2">
        <input className="border-box flex-1 p-2 rounded border-2 text-xl" type="text" value={keyword} onChange={(e) => send({ type: 'TYPE', query: e.target.value })} />
        <button className="border-box px-2 rounded border-2 hover:bg-gray-100" onClick={() => send('ERROR')}>Make me error</button>
      </div>
      <SearchResult title="Subreddit Search Result">
        {
          current.matches('ready') ? renderGuard(subredditsNodes) :
          current.matches('error') ? 'Something went wrong. Retrying in 3 seconds...' :
          isSearching ? 'searching...': null
        }
      </SearchResult>
      <SearchResult title="User Search Result">
        {
          current.matches('ready') ? renderGuard(usersNodes) :
          current.matches('error') ? 'Something went wrong. Retrying in 3 seconds...' :
          isSearching ? 'searching...': null
        }
      </SearchResult>
    </div>
  )
}

export default Reddit;

import React from 'react'

import Reddit from './Reddit'

const RedditPage: React.FC<unknown> = () => {
  const desc = `
    A simple reddit search which you can:

    - search keyword with debounce (1s delay search when user stops typing).
    - API requests.
    - retry on error.
  `

  return (
    <>
      <h1 className="text-4xl">Reddit Search Page</h1>
      <pre>{desc}</pre>
      <Reddit />
    </>
  )
}

export default RedditPage;

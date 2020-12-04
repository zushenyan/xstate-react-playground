import React from 'react'

export type Props = {
  title: string;
  children: React.ReactNode;
}

const SearchResult: React.FC<Props> = ({
  title,
  children
}: Props) => {
  return (
    <div className="border-box flex flex-col space-y-2">
      <h1 className="text-2xl border-b-2 border-black">{title}</h1>
      <div className="h-40 space-y-1 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}

export default SearchResult;

export interface SearchSubredditResponse {
  data: {
    dist: number;
    children: {
      data: {
        title: string;
        public_description: string;
      };
    }[];
  };
}

export interface SearchUserResponse {
  data: {
    dist: number;
    children: {
      data: {
        name: string;
      };
    }[];
  };
}

export const searchSubreddits = async (
  keyword: string
): Promise<SearchSubredditResponse> => {
  const result = await fetch(
    `https://www.reddit.com/subreddits/search.json?q=${keyword}`
  );
  return await result.json();
};

export const searchUsers = async (
  keyword: string
): Promise<SearchUserResponse> => {
  const result = await fetch(
    `https://www.reddit.com/users/search.json?q=${keyword}`
  );
  return await result.json();
};

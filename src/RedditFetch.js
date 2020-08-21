
const RedditFetch = async (category, limits, count, after = null, before = null) => {
  const response = await fetch(
    `https://www.reddit.com/r/${category}.json?limit=${limits}&dist=${limits}&after=${after}&count=${count}&before=${before}&count=${count}`
  );
  const {data} = await response.json();
  return data
};

export default RedditFetch
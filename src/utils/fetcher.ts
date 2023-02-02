// @ts-ignore
const fetcher = (endpoint, ...args) => {
  const apiUrl = process.env.NEXT_PUBLIC_ENDPOINT;
  if (!apiUrl) throw Error("Invalid Api Endpoint");
  return fetch(`${apiUrl}${endpoint}`, ...args).then((res) => res.json());
};

export default fetcher;

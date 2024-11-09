const fetchWithAuth = async (url, options) => {
  const authCode = localStorage.getItem('authCode');
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  };
  if (options.headers) {
    headers = { ...headers, ...options.headers };
  }
  if (authCode) {
    headers.Authorization = `${authCode}`;
  }
  return await fetch(url, { ...options, headers });
};

export default fetchWithAuth;

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, { ...options, headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

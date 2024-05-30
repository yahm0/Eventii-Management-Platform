export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    const response = await fetch(url, { ...options, headers });
    return response.json();
  };
  
import axios from 'axios';

const axiosInstance = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_API_URL}` ,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
  
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {
  return response;
}

, (error) => {
  console.error('API error:', error.response?.data || error.message);
  return Promise.reject(error);
});

export default axiosInstance;

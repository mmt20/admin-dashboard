import baseURL from '../Api/baseURL';
const useInsertDataWithImage = async (url, params) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Authorization token not found in local storage');
    return;
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await baseURL.post(url, params, config);
  console.log(res);
  return res.data;
};

const useInsertData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await baseURL.post(url, params, config);
  console.log(res);
  return res.data;
};

export { useInsertData, useInsertDataWithImage };

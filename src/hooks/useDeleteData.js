import baseUrl from '../Api/baseURL';

const useDeleteData = async (url) => {
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

  try {
    const res = await baseUrl.delete(url, config);
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error occurred while deleting data:', error);
    throw error;
  }
};

export default useDeleteData;

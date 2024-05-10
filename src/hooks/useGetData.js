// import baseURL from '../Api/baseURL';

// const useGetData = async (url, params) => {
//   console.log(localStorage.getItem('token'));
//   const config = {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//   };
//   const res = await baseURL.get(url, params, config);
//   return res.data;
// };
// export default useGetData;

import baseURL from '../Api/baseURL';
import queryString from 'query-string';

const useGetData = async (url, params) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  // Encode params with the URL using query-string library
  const encodedParams = queryString.stringify(params);

  const res = await baseURL.get(`${url}?${encodedParams}`, config);
  return res.data;
};

export default useGetData;

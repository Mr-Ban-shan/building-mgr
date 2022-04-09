import axios from 'axios';

export const add = (form) => {
    return axios.post(
      'http://localhost:3000/building/add', 
      form,
  );
};

export const list = (data) => {
    return axios.get(
      'http://localhost:3000/building/list', 
      {
        params: data,
      }
  );
};

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/building/${id}`, 
  );
};

export const updateCount = (data={}) => {
  return axios.post(
    `http://localhost:3000/building/update/count`, 
    data,
  );
};

export const update = (data = {}) => {
  return axios.post(
    `http://localhost:3000/building/update`,
    data,
  );
};









// import {
//   del, post, get
// } from '@/helpers/request';

// export const add = (form) => {
//   return post(
//     '/good/add',
//     form,
//   );
// };

// export const list = (data) => {
//   return get(
//     '/good/list',
//     data
//   );
// };

// export const remove = (id) => {
//   return del(
//     `/good/${id}`,
//   );
// };

// export const updateCount = (data = {}) => {
//   return post(
//     `/good/update/count`,
//     data,
//   );
// };

// export const update = (data = {}) => {
//   return post(
//     `/good/update`,
//     data,
//   );
// };

// export const detail = (id) => {
//   return get(
//     `/good/detail/${id}`,
//   );
// };

// export const addMany = (key) => {
//   return post('/good/addMany', {
//     key,
//   });
// };

import axios from 'axios';
import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

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
        /* headers: {
          Authorization: `Bearer ${getToken}`
        }, */
      },
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

export const detail = (id) => {
  return axios.get(
    `http://localhost:3000/building/detail/${id}`,
  );
};








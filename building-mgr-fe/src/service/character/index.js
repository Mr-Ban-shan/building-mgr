import axios from 'axios';

/* import { get } from '@/helpers/request'; */

export const list = () => {
  return axios.get(
    'http://localhost:3000/character/list',
  );
};

import {
  del, post, get
} from '@/helpers/request';

export const add = (form) => {
  return post(
    '/building/add',
    form,
  );
};

export const list = (data) => {
  return get(
    '/building/list',
    data
  );
};

export const remove = (id) => {
  return del(
    `/building/${id}`,
  );
};

export const updateCount = (data = {}) => {
  return post(
    `/building/update/count`,
    data,
  );
};

export const update = (data = {}) => {
  return post(
    `/building/update`,
    data,
  );
};

export const detail = (id) => {
  return get(
    `/building/detail/${id}`,
  );
};

export const addMany = (key) => {
  return post('/building/addMany', {
    key,
  });
};


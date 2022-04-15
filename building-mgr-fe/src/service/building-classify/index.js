import {
  del, post, get
} from '@/helpers/request';

export const add = (title) => {
  return post('/building-classify/add', {
    title,
  });
};

export const list = () => {
  return get('/building-classify/list');
};

export const remove = (id) => {
  return del(`/building-classify/${id}`);
};

export const updateTitle = (id, title) => {
  return post('/building-classify/update/title', {
    id,
    title,
  });
};

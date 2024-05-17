import axios from 'axios';

export const fetch = url => {
  const res = axios.get(url);
  return res;
};

export const processApiErrors = async (err = {}) => {
  if (err.status === 401) {
    //logout user
  } else if (err.status === 403 || err.status === 511) {
    //get refresh token
  }
  return err;
};

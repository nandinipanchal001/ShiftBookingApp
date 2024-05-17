import _ from 'lodash';

export const fetchData = (url, opts = {}) => {
  // console.log('method',method)
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    ...opts,
  };
  console.log('options', url, options);
  const res = fetch(url, options);
  return res;
};

export const processApiRes = async res => {
  const data = await res.json();
  // console.log('processApiRes',data)
  return data;
};

export const processApiErrors = async (err = {}) => {
  if (err.status === 401) {
    //logout user
  } else if (err.status === 403 || err.status === 511) {
    //get refresh token
  }
  return err;
};

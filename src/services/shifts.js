import {processApiErrors, fetchData, processApiRes} from '../utils/utils';
import config from '../config';

const baseUrl = config.baseUrl;

export const getAllShifts = async () => {
  try {
    const res = await fetchData(`${baseUrl}/shifts`);
    const resData = await processApiRes(res);
    return resData;
  } catch (error) {
    console.log('error', error);
    const err = await processApiErrors(error);
    throw err;
  }
};

export const bookShift = async id => {
  try {
    const res = await fetchData(`${baseUrl}/shifts/${id}/book`, {
      method: 'POST',
    });
    const resData = await processApiRes(res);
    return resData;
  } catch (error) {
    console.log('error', error);
    const err = await processApiErrors(error);
    throw err;
  }
};

export const cancelShift = async id => {
  try {
    const res = await fetchData(`${baseUrl}/shifts/${id}/cancel`, {
      method: 'POST',
    });
    const resData = await processApiRes(res);
    return resData;
  } catch (error) {
    console.log('error', error);
    const err = await processApiErrors(error);
    throw err;
  }
};

import {processApiErrors, fetch} from '../utils/utils';
import config from '../config';

const baseUrl = config.baseUrl;

export const getAllShifts = async () => {
  try {
    const res = await fetch(`${baseUrl}/shifts`);
    return res;
  } catch (error) {
    const err = await processApiErrors(error);
    throw err;
  }
};

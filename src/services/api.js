import axios from 'axios';
import Config from 'react-native-config';

// RestAPI Base URL
// Todo : ini undefined, sementara di hard code
// const BASE_URL = Config.RESTAPI_BASE_URL;

// const BASE_URL = 'https://d4c0-182-1-91-106.ap.ngrok.io';
const BASE_URL = 'https://api.amberkopi.my.id';
console.log('BASE_URL', BASE_URL);
const ENABLE_DEBUG = false; // true;

// Create HTTP client
const api = axios.create({
  baseURL: BASE_URL,
});

// Set accept header
api.defaults.headers.Accept = 'application/json';

export const interceptRequest = func => {
  api.interceptors.request.use(func);
};

// interceptRequest(req => {
//   console.log('REQUEST', JSON.stringify(req));
//   return req;
// });

const onErrorCallback = [];

export const onResponseError = fn => {
  if (!onErrorCallback.includes(fn)) {
    onErrorCallback.push(fn);
  }
};

// Intercept API response errors
api.interceptors.response.use(
  res => {
    ENABLE_DEBUG && console.log('DEBUG RESPONSEx:', JSON.stringify(res));
    return res.data;
  },
  async error => {
    ENABLE_DEBUG &&
      console.log(
        'ERROR RESPONSE:',
        error.request._url,
        error.response.status,
        JSON.stringify(error.response.data),
      );
    if (error.response) {
      const {data, status} = error.response;
      onErrorCallback.forEach(cb => cb({message: data?.message, status}));
      throw new APIError(data?.message, status);
    }
    const err = error?.message || 'Network error!';
    throw new APIError(err);
  },
);

class APIError extends Error {
  constructor(message, status = 400) {
    console.log('messagex', message);
    const msg = message || `API Error! code: ${status}`;
    super(msg);
    this.status = status;
  }
}

export const getImageUri = image => {
  const ext = image?.substr(image.lastIndexOf('.') + 1);
  if (!['jpg', 'png', 'jpeg'].includes(ext)) {
    return null;
  }

  if (image.startsWith('http')) {
    return {uri: image};
  }

  let baseUrl = BASE_URL;
  if (
    !image.startsWith('/public/images') &&
    !image.startsWith('public/images')
  ) {
    baseUrl += '/public/images';
  }

  return {uri: `${baseUrl}/${image}`};
};

export default api;

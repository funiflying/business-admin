import fetch from 'dva/fetch';
import {getToken} from './index'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const headers={
    headers:{
      'token':getToken(),
      'deviceTag':4,
      'content-type':'application/json;charset=UTF-8'
    }
 };
  return fetch(url, {...options,...headers})
    .then(checkStatus)
    .then(parseJSON)
    .catch(err =>{
        //throw new Error(err)
    });
}

import fetch from 'dva/fetch';
import {getSession} from './index'
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
export default async function  request(url, options) {
  let profile=getSession('PROFILE');
  const headers={
    headers:{
      'token':'5ce90c987a3c6735049144ba9c68573c280c5e21',//profile&&profile.token,
      'deviceTag':3,
      'content-type':'application/json;charset=UTF-8'
    }
 }
  return fetch(url, {...options,...headers})
    .then(checkStatus)
    .then(parseJSON)
    .then(data=>({data}))
    .catch(err =>{
        throw new Error(err)
    });
}

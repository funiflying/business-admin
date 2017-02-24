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
      'token':'60b98f7497301cf9005bb9b866b2c9d9bb0a14ea',//profile&&profile.token,
      'deviceTag':3
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

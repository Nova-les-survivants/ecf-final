import Axios from 'axios';

const { REACT_APP_API_BASE_URL } = process.env;

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
}

export default (
  url,
  method = HTTP_METHOD.GET,
  data = null,
) =>
  Axios.request({
    method,
    baseURL: REACT_APP_API_BASE_URL,
    url,
    data,
    withCredentials: true,
  })
;
    
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
  uri,
  method = HTTP_METHOD.GET,
  body = null,
) =>
  method === HTTP_METHOD.GET ?
    Axios.get(
      `${REACT_APP_API_BASE_URL}/${uri}`,
      {
        withCredentials: true,
      },
    )
  :
    Axios[method](
      `${REACT_APP_API_BASE_URL}/${uri}`,
      body,
      {
        withCredentials: true,
      }
    )
;
    
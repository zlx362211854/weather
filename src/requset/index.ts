import axios from "axios";

const request = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 3000,
  headers: {},
});

export function setInterceptors(errorLogRef: any) {
  request.interceptors.response.use(
    function (response) {
      // @ts-ignore
      errorLogRef?.current?.setError('')
      if (response) {
        return response.data
      }
    },
    function (error) {
      // @ts-ignore
      if (error.response && error.response.data.message) {
        errorLogRef?.current?.setError(error.response.data.message);
      }
    }
  );
}
export default request
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const FormSubmitHandler = ({ method = 'post', url, params = {}, data = {} }) => {
  return axios({
    method, url: `${apiUrl}${url}`, params, data
  }).then(response => {
    return Promise.resolve(response.data);
  }).catch(err => {
    return Promise.reject(err.response.data);
  });
};

export default FormSubmitHandler;

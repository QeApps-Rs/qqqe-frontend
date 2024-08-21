import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL; 

const FormSubmitHandler = async ({ method = 'post', url, params = {}, data = {} }) => {
  try {
    const response = await axios({
      method,
      url: `${apiUrl}${url}`,
      params,
      data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || err.message,
    };
  }
};

export default FormSubmitHandler;

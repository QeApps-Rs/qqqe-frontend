import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const FormSubmitHandler = async ({
  method = "post",
  url = "",
  params = {},
  data = {},
}) => {
  try {
    const response = await axios({
      method,
      url: `${apiUrl}${url}`, // Concatenate base URL with endpoint URL
      params,
      data,
    });
    return response.data;
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || err.message,
    };
  }
};

export default FormSubmitHandler;

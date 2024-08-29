import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const FormSubmitHandler = async ({ method = 'post', url, params = {}, data = {} }) => {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return await axios({
        method, url: `${apiUrl}${url}`, params, data, headers
    }).then(response => {
        return Promise.resolve(response.data);
    }).catch(err => {
        if (err.response.status == 403 || err.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = '/';
        }
        return Promise.reject(err.response.data);
    });
};

export default FormSubmitHandler;

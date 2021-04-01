import axios from "axios";

export default {
    register: data => {
        return axios.post("/api/users/register", data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        })
    },
    login: data => {
        return axios.post("/api/users/login", data)
    }
}

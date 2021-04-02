import axios from "axios";

const API = {
    register: data => {
        return axios.post("/api/users/register", data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        })
    },
    login: data => {
        return axios.post("/api/users/login", data)
    },
    findUser: () => {
        return axios.get("/api/users/finduser")
    },
    isAuthorized: () => {
        return axios.get("/api/users/authorize")
    }
}

export default API;

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
    logout: () => {
        return axios.get('/api/users/logout')
    },
    findUser: () => {
        return axios.get("/api/users/finduser")
    },
    isAuthorized: () => {
        return axios.get("/api/users/authorize")
    },
    findFriends: query => {
        return axios.get(`/api/users/findfriends/${query}`)
    },
    addFriend: userInfo => {
        return axios.post(`/api/users/addFriend`, userInfo, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${userInfo._boundary}`
            }
        })
    }
}

export default API;

import axios from "axios";

const API = {
    register: data => {
        return axios.post("/api/users/register", data)
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
        return axios.post(`/api/users/friends`, userInfo)
    },
    createChat: chatInfo => {
        return axios.post('/api/users/chatroom', chatInfo)
    },
    addRoomToUser: chatInfo => {
        return axios.put('/api/users/chatroom', chatInfo)
    },
    sendMessage: message => {
        return axios.post('/api/users/messages', message)
    }
}

export default API;

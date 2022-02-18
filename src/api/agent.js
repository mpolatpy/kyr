import axios from 'axios';

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
};

axios.defaults.baseURL = 'http://localhost:3001';

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    patch: (url, body) => axios.patch(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
};

const Users = {
    list: () => requests.get('/users'),
    details: (id) => requests.get(`/users/${id}`),
    create: (user) => requests.post('/users', user),
    update: (id, userInfo) => requests.patch(`/users/${id}`, userInfo),
    delete: (id) => requests.delete(`/users/${id}`)
};

const agent = {
    Users
}

export default agent;


import axios from 'axios';

import * as Constants from '../utils/Endpoints';

class UserService {

    createUser(user) {
        return axios.post(`${Constants.CREATE_USER}`, user);
    }

    fetchUsers() {
        return axios.get(`${Constants.FETCH_USERS}`);
    }

    loginUser(user) {
        return axios.post(`${Constants.LOGIN_USER}`, user);
    }
}

export default new UserService();
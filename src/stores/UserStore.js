import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';

    this.fetchUserNameServerError = '';
    this.loginServerError = '';
  }

  async login({ username, password }) {
    try {
      const data = await userApiService.postSession({ username, password });
      this.accessToken = data.accessToken;
      return this.accessToken;
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.loginServerError = errorMessage;
      return '';
    }
  }

  async fetchUserName() {
    try {
      const data = await userApiService.fetchUserName();
      this.name = data.name;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.fetchUserNameServerError = errorMessage;
      this.publish();
    }
  }

  clearLoginError() {
    this.loginServerError = '';
    this.publish();
  }
}

export const userStore = new UserStore();

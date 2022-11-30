import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.loginErrorMessage = '';
  }

  async login({ username, password }) {
    try {
      const data = await userApiService.postSession({ username, password });
      this.accessToken = data.accessToken;
      return this.accessToken;
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.loginErrorMessage = errorMessage;
      return '';
    }
  }

  clearLoginError() {
    this.loginErrorMessage = '';
    this.publish();
  }
}

export const userStore = new UserStore();

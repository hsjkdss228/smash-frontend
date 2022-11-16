import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.userId = '';
    this.accessToken = '';
    this.loginErrorMessage = '';
  }

  changeUserId(userId) {
    this.userId = userId;
    this.publish();
  }

  async login() {
    try {
      const data = await userApiService.postSession(this.userId);
      this.accessToken = data.accessToken;
      return this.accessToken;
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.loginErrorMessage = errorMessage;
      return '';
    }
  }
}

export const userStore = new UserStore();

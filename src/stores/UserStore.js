import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.loginErrorMessage = '';
  }

  async login({ identifier, password }) {
    try {
      const data = await userApiService.postSession({ identifier, password });
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

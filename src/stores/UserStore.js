import { userApiService } from '../services/UserApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';

    this.fetchUserNameServerError = '';
    this.loginServerError = '';
    this.signUpServerError = '';
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
      const errorMessage = error.response.data;

      this.fetchUserNameServerError = '알 수 없는 에러입니다.';
      if (errorMessage === 'User Not Found') {
        this.fetchUserNameServerError = '사용자를 찾을 수 없습니다.';
      }

      this.publish();
    }
  }

  async signUp({
    name,
    username,
    password,
    confirmPassword,
    gender,
    phoneNumber,
  }) {
    try {
      const signUpForm = {
        name,
        username,
        password,
        confirmPassword,
        gender,
        phoneNumber,
      };
      const data = await userApiService.signUp(signUpForm);
      const { enrolledName } = data;
      return enrolledName;
    } catch (error) {
      this.signUpServerError = error.response.data;
      this.publish();
      return '';
    }
  }

  clearLoginError() {
    this.loginServerError = '';
    this.publish();
  }

  clearSignUpError() {
    this.signUpServerError = '';
    this.publish();
  }
}

export const userStore = new UserStore();

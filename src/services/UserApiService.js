/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class UserApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ username, password }) {
    const url = `${apiBaseUrl}/session`;
    const { data } = await axios.post(url, { username, password });
    return data;
  }

  async fetchUserName() {
    const url = `${apiBaseUrl}/users/me`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async signUp(signUpForm) {
    const url = `${apiBaseUrl}/users`;
    const { data } = await axios.post(url, {
      ...signUpForm,
    });
    return data;
  }
}

export const userApiService = new UserApiService();

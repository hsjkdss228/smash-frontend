/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class UserApiService {
  async postSession(userId) {
    const url = `${apiBaseUrl}/session`;
    const { data } = await axios.post(url, { userId });
    return data;
  }
}

export const userApiService = new UserApiService();

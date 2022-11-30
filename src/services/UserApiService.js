/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class UserApiService {
  async postSession({ username, password }) {
    const url = `${apiBaseUrl}/session`;
    const { data } = await axios.post(url, { username, password });
    return data;
  }
}

export const userApiService = new UserApiService();

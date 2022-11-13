/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class RegisterApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async registerToGame(gameId) {
    const url = `${apiBaseUrl}/registers/games/${gameId}`;

    const { data } = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data.gameId;
  }
}

export const registerApiService = new RegisterApiService();

/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class MemberApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async cancelParticipateGame(gameId) {
    const url = `${apiBaseUrl}/members/games/${gameId}`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export const memberApiService = new MemberApiService();

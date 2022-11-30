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

  async fetchMembers(gameId) {
    const url = `${apiBaseUrl}/games/${gameId}/members`;
    const { data } = await axios.get(url);
    return data;
  }

  async fetchApplicants(gameId) {
    const url = `${apiBaseUrl}/games/${gameId}/applicants`;
    const { data } = await axios.get(url);
    return data;
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

  async cancelRegisterToGame(registerId) {
    const url = `${apiBaseUrl}/registers/${registerId}`;
    await axios.patch(url, { }, {
      params: { status: 'canceled' },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async cancelParticipateToGame(registerId) {
    const url = `${apiBaseUrl}/registers/${registerId}`;
    await axios.patch(url, { }, {
      params: { status: 'canceled' },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async acceptRegister(registerId) {
    const url = `${apiBaseUrl}/registers/${registerId}`;
    await axios.patch(url, { }, {
      params: { status: 'accepted' },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async rejectRegister(registerId) {
    const url = `${apiBaseUrl}/registers/${registerId}`;
    await axios.patch(url, { }, {
      params: { status: 'rejected' },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export const registerApiService = new RegisterApiService();

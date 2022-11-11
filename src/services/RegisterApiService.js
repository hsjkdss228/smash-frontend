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
    console.log('gameId in RegisterApiService: ', gameId);

    const url = `${apiBaseUrl}/registers/games/${gameId}`;

    const { data } = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data.gameId;

    // const url = `${apiBaseUrl}/member/register`;
    // const { data } = await axios.post(url, {
    //   gameId, teamId, roleId,
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${this.accessToken}`,
    //   },
    // });
    // // console.log(data);
    // return data;
  }

  // async cancelRegister(roleId) {
  //   const url = `${apiBaseUrl}/member/user`;
  //   await axios.delete(url, {
  //     data: { roleId },
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken}`,
  //     },
  //   });
  // }
}

export const registerApiService = new RegisterApiService();
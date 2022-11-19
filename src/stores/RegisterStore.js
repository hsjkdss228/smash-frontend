/* eslint-disable class-methods-use-this */

import { registerApiService } from '../services/RegisterApiService';
import Store from './Store';

export default class RegisterStore extends Store {
  constructor() {
    super();

    this.registeredGameId = -1;
    this.registerErrorCodeAndMessage = {};

    this.members = [];
    this.membersErrorMessage = '';
  }

  async fetchMembers(gameId) {
    try {
      const data = await registerApiService.fetchMembers(gameId);
      this.members = data.members;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.membersErrorMessage = errorMessage;
      this.publish();
    }
  }

  async registerToGame(gameId) {
    try {
      this.registeredGameId = await registerApiService.registerToGame(gameId);
      return this.registeredGameId;
    } catch (error) {
      const { errorCode, errorMessage } = error.response.data;
      this.registerErrorCodeAndMessage = {
        code: errorCode,
        message: errorMessage,
      };
      return '';
    }
  }

  async cancelParticipateGame(gameId) {
    await registerApiService.cancelParticipateGame(gameId);
  }
}

export const registerStore = new RegisterStore();

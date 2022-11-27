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

    this.applicants = [];
    this.applicantsErrorMessage = '';
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

  async fetchApplicants(gameId) {
    try {
      const data = await registerApiService.fetchApplicants(gameId);
      this.applicants = data.applicants;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.applicantsErrorMessage = errorMessage;
      this.publish();
    }
  }

  async registerToGame(gameId) {
    try {
      this.registeredGameId = await registerApiService.registerToGame(gameId);
      return this.registeredGameId;
    } catch (error) {
      const { errorCode, errorMessage, gameId } = error.response.data;
      this.registerErrorCodeAndMessage = {
        errorCode,
        errorMessage,
        gameId,
      };
      this.publish();
      return '';
    }
  }

  async cancelRegisterToGame(registerId) {
    await registerApiService.cancelRegisterToGame(registerId);
  }

  async cancelParticipateToGame(registerId) {
    await registerApiService.cancelParticipateToGame(registerId);
  }

  async acceptRegister(registerId) {
    await registerApiService.acceptRegister(registerId);
  }

  async rejectRegister(registerId) {
    await registerApiService.rejectRegister(registerId);
  }
}

export const registerStore = new RegisterStore();

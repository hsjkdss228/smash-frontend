/* eslint-disable class-methods-use-this */

import { registerApiService } from '../services/RegisterApiService';
import Store from './Store';

export default class RegisterStore extends Store {
  constructor() {
    super();

    this.registeredGameId = -1;
    this.registerServerError = '';

    this.members = [];
    this.membersServerError = '';

    this.applicants = [];
    this.applicantsServerError = '';

    this.registerAcceptServerError = '';
  }

  async fetchMembers(gameId) {
    try {
      const data = await registerApiService.fetchMembers(gameId);
      this.members = data.members;
      this.publish();
    } catch (error) {
      this.membersServerError = error.response.data;
      this.publish();
    }
  }

  async fetchApplicants(gameId) {
    try {
      const data = await registerApiService.fetchApplicants(gameId);
      this.applicants = data.applicants;
      this.publish();
    } catch (error) {
      this.applicantsServerError = error.response.data;
      this.publish();
    }
  }

  async registerToGame(gameId) {
    try {
      this.registeredGameId = await registerApiService.registerToGame(gameId);
      return this.registeredGameId;
    } catch (error) {
      this.registerServerError = error.response.data;
      this.publish();
      return '';
    }
  }

  async cancelRegisterGame(registerId) {
    await registerApiService.cancelRegisterGame(registerId);
  }

  async cancelParticipateGame(registerId) {
    await registerApiService.cancelParticipateGame(registerId);
  }

  async acceptRegister(registerId) {
    try {
      await registerApiService.acceptRegister(registerId);
    } catch (error) {
      this.registerAcceptServerError = error.response.data;
    }
  }

  async rejectRegister(registerId) {
    await registerApiService.rejectRegister(registerId);
  }
}

export const registerStore = new RegisterStore();

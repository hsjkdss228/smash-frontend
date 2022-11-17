/* eslint-disable class-methods-use-this */

import { memberApiService } from '../services/MemberApiService';
import Store from './Store';

export default class MemberStore extends Store {
  constructor() {
    super();

    this.members = [];
    this.membersErrorMessage = '';
  }

  async fetchMembers(gameId) {
    try {
      const data = await memberApiService.fetchMembers(gameId);
      this.members = data.members;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.membersErrorMessage = errorMessage;
      this.publish();
    }
  }

  async cancelParticipateGame(gameId) {
    await memberApiService.cancelParticipateGame(gameId);
  }
}

export const memberStore = new MemberStore();

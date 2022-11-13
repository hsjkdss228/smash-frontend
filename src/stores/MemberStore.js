import { memberApiService } from '../services/MemberApiService';
import Store from './Store';

export default class MemberStore extends Store {
  constructor() {
    super();
  }

  async cancelParticipateGame(gameId) {
    await memberApiService.cancelParticipateGame(gameId);
  }
}

export const memberStore = new MemberStore();

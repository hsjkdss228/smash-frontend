import { gameApiService } from '../services/GameApiService';
import Store from './Store';

export default class GameStore extends Store {
  constructor() {
    super();

    this.game = {};
    this.gameServerError = '';
  }

  async fetchGame(postId) {
    try {
      const data = await gameApiService.fetchGame(postId);
      this.game = data;
      return this.game.id;
    } catch (error) {
      this.gameServerError = error.response.data;
      return '';
    }
  }
}

export const gameStore = new GameStore();

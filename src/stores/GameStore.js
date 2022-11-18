import { gameApiService } from '../services/GameApiService';
import Store from './Store';

export default class GameStore extends Store {
  constructor() {
    super();

    this.game = {};
    this.gameErrorMessage = '';
  }

  async fetchGame(postId) {
    try {
      const data = await gameApiService.fetchGame(postId);
      this.game = data;
      return this.game.id;
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.gameErrorMessage = errorMessage;
      return '';
    }
  }
}

export const gameStore = new GameStore();

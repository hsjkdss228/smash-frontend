import { registerApiService } from '../services/RegisterApiService';
import Store from './Store';

export default class RegisterStore extends Store {
  constructor() {
    super();

    this.registeredGameId = -1;
    this.registerErrorCodeAndMessage = {};
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
}

export const registerStore = new RegisterStore();

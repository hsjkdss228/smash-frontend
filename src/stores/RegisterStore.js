import { registerApiService } from '../services/RegisterApiService';
import Store from './Store';

export default class RegisterStore extends Store {
  constructor() {
    super();

    this.registeredGameId = -1;
  }

  async registerToGame(gameId) {
    try {
      console.log('gameId in RegisterStore: ', gameId);
      this.registeredGameId = await registerApiService.registerToGame(gameId);
      return this.registeredGameId;
    } catch (error) {
      // TODO: 에러 코드와 메세지를 설정하고 publish
      return '';
    }
  }
}

export const registerStore = new RegisterStore();

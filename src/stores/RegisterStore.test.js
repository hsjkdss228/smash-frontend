import context from 'jest-plugin-context';
import RegisterStore from './RegisterStore';

import { registerApiService } from '../services/RegisterApiService';

describe('RegisterStore', () => {
  const registerStore = new RegisterStore();

  context('운동 참가 신청 API를 요청할 경우', () => {
    it('registerApiService API 요청을 호출하고 응답으로 받은 gameId를 반환', async () => {
      registerApiService.setAccessToken('userId 1');
      const gameId = 1;
      const registeredGameId = await registerStore.registerToGame(gameId);

      expect(registeredGameId).toBe(1);
    });
  });
});

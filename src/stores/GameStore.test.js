import context from 'jest-plugin-context';
import GameStore from './GameStore';

import { gameApiService } from '../services/GameApiService';

describe('GameStore', () => {
  const gameStore = new GameStore();

  context('API 서버에 게시글의 게임 상세 정보 데이터를 요청할 경우', () => {
    const postId = 1;

    it('백엔드 서버에서 응답으로 전달된 단일 game을 상태로 저장', async () => {
      gameApiService.setAccessToken('userId 1');
      await gameStore.fetchGame(postId);

      const { game, gameErrorMessage } = gameStore;

      expect(Object.keys(game).length).toBe(8);
      expect(game.place).toBe('서울숲탁구클럽');
      expect(game.registerStatus).toBe('none');
      expect(gameErrorMessage).toBeFalsy();
    });
  });
});

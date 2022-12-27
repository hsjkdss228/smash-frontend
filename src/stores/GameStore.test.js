import context from 'jest-plugin-context';
import GameStore from './GameStore';

import { gameApiService } from '../services/GameApiService';

let gameStore;

describe('GameStore', () => {
  beforeEach(() => {
    gameStore = new GameStore();
    gameApiService.setAccessToken('userId 1');
  });

  context('서버에 특정 게시글의 경기 상세 정보를 요청하는 API를 호출하면', () => {
    const postId = 1;

    context('정상적인 Access Token으로 요청했을 경우', () => {
      it('서버에서 응답으로 전달된 게시글의 경기 상세 정보를 상태로 저장', async () => {
        await gameStore.fetchGame(postId);

        const { game, gameServerError } = gameStore;
        expect(Object.keys(game).length).toBe(8);
        expect(gameServerError).toBeFalsy();
      });
    });

    context('잘못된 Access Token으로 요청했을 경우', () => {
      beforeEach(() => {
        gameApiService.setAccessToken('Wrong Access Token');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await gameStore.fetchGame(postId);

        const { game, gameServerError } = gameStore;
        expect(Object.keys(game).length).toBe(0);
        expect(gameServerError).toBe('User Not Found');
      });
    });

    context('특정 게시글의 경기 상세 정보가 존재하지 않는 오류가 있을 경우', () => {
      const postIdWithoutGame = 444;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await gameStore.fetchGame(postIdWithoutGame);

        const { game, gameServerError } = gameStore;
        expect(Object.keys(game).length).toBe(0);
        expect(gameServerError).toBe('Game Not Found');
      });
    });
  });
});

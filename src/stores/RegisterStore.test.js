import context from 'jest-plugin-context';
import RegisterStore from './RegisterStore';

import { registerApiService } from '../services/RegisterApiService';

describe('RegisterStore', () => {
  let registerStore;

  beforeEach(() => {
    registerStore = new RegisterStore();
  });

  context('운동 참가 신청 API를 요청할 경우 (정상 케이스)', () => {
    it('registerApiService API 요청을 호출하고 응답으로 받은 gameId를 반환', async () => {
      // cf. localStorage.setItem()으로 token을 설정해줄 수도 있다.
      registerApiService.setAccessToken('userId 1');
      const gameId = 1;
      await registerStore.registerToGame(gameId);

      const { registeredGameId, registerErrorCodeAndMessage } = registerStore;

      expect(registeredGameId).toBe(1);
      expect(registerErrorCodeAndMessage).toStrictEqual({});
    });
  });

  context('존재하지 않는 game Id로 운동 참가 신청 API를 요청할 경우', () => {
    it('게임을 찾을 수 없다는 에러 상태 저장', async () => {
      registerApiService.setAccessToken('userId 1');
      const wrongGameId = 100;
      await registerStore.registerToGame(wrongGameId);

      const { registeredGameId, registerErrorCodeAndMessage } = registerStore;

      expect(registeredGameId).toBe(-1);
      expect(registerErrorCodeAndMessage).toStrictEqual({
        code: 100,
        message: '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.',
      });
    });
  });

  context('신청이 완료된 user Id로 운동 참가 신청 API를 요청할 경우', () => {
    it('신청이 완료된 운동이라는 에러 상태 저장', async () => {
      registerApiService.setAccessToken('already registered userId 2');
      const gameId = 1;
      await registerStore.registerToGame(gameId);

      const { registeredGameId, registerErrorCodeAndMessage } = registerStore;

      expect(registeredGameId).toBe(-1);
      expect(registerErrorCodeAndMessage).toStrictEqual({
        code: 101,
        message: '이미 신청이 완료된 운동입니다.',
      });
    });
  });

  context('존재하지 않는 user Id로 운동 참가 신청 API를 요청할 경우', () => {
    it('사용자를 찾을 수 없다는 에러 상태 저장', async () => {
      registerApiService.setAccessToken('not existed userId 3');
      const gameId = 1;
      await registerStore.registerToGame(gameId);

      const { registeredGameId, registerErrorCodeAndMessage } = registerStore;

      expect(registeredGameId).toBe(-1);
      expect(registerErrorCodeAndMessage).toStrictEqual({
        code: 102,
        message: '주어진 사용자 번호에 해당하는 사용자를 찾을 수 없습니다.',
      });
    });
  });
});

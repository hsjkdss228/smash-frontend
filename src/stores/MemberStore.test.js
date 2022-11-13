import context from 'jest-plugin-context';
import MemberStore from './MemberStore';

import { memberApiService } from '../services/MemberApiService';

describe('MemberStore', () => {
  const memberStore = new MemberStore();

  context('운동 참가 취소 API를 요청할 경우', () => {
    it('memberApiService API 요청을 호출', async () => {
      memberApiService.setAccessToken('userId 1');
      const gameId = 1;
      await memberStore.cancelParticipateGame(gameId);
    });
  });
});

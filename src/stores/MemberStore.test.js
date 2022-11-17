import context from 'jest-plugin-context';
import MemberStore from './MemberStore';

import { memberApiService } from '../services/MemberApiService';

describe('MemberStore', () => {
  const memberStore = new MemberStore();

  context('API 서버에 게시글 게임의 참가자 상세 정보 데이터를 요청할 경우', () => {
    const gameId = 1;

    it('백엔드 서버에서 응답으로 전달된 member 컬렉션을 상태로 저장', async () => {
      memberApiService.setAccessToken('userId 1');
      await memberStore.fetchMembers(gameId);

      const { members, membersErrorMessage } = memberStore;

      expect(members.length).toBe(2);
      expect(members[0].name).toBe('작성자');
      expect(members[1].gender).toBe('여성');
      expect(membersErrorMessage).toBeFalsy();
    });
  });

  context('운동 참가 취소 API를 요청할 경우', () => {
    it('memberApiService API 요청을 호출', async () => {
      memberApiService.setAccessToken('userId 1');
      const gameId = 1;
      await memberStore.cancelParticipateGame(gameId);
    });
  });
});

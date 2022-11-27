import context from 'jest-plugin-context';
import RegisterStore from './RegisterStore';

import { registerApiService } from '../services/RegisterApiService';

describe('RegisterStore', () => {
  let registerStore;

  beforeEach(() => {
    registerStore = new RegisterStore();
  });

  context('API 서버에 게시글 게임의 참가자 상세 정보 데이터를 요청할 경우', () => {
    const gameId = 1;

    it('백엔드 서버에서 응답으로 전달된 member 컬렉션을 상태로 저장', async () => {
      registerApiService.setAccessToken('userId 1');
      await registerStore.fetchMembers(gameId);

      const { members, membersErrorMessage } = registerStore;

      expect(members.length).toBe(2);
      expect(members[0].name).toBe('작성자');
      expect(members[1].gender).toBe('여성');
      expect(membersErrorMessage).toBeFalsy();
    });
  });

  context('API 서버에 게시글 게임의 신청자 상세 정보 데이터를 요청할 경우', () => {
    const gameId = 2;

    it('백엔드 서버에서 응답으로 전달된 applicant 컬렉션을 상태로 저장', async () => {
      registerApiService.setAccessToken('userId 1');
      await registerStore.fetchApplicants(gameId);

      const { applicants, applicantsErrorMessage } = registerStore;

      expect(applicants.length).toBe(2);
      expect(applicants[0].name).toBe('신청자 1');
      expect(applicants[1].gender).toBe('남성');
      expect(applicantsErrorMessage).toBeFalsy();
    });
  });

  context('운동 참가 신청 API를 요청할 경우 (정상 케이스)', () => {
    it('registerApiService 신청자 생성 POST API 요청을 호출하고 응답으로 받은 gameId를 반환', async () => {
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
        errorCode: 100,
        errorMessage: '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.',
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
        errorCode: 101,
        errorMessage: '이미 신청이 완료된 운동입니다.',
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
        errorCode: 102,
        errorMessage: '주어진 사용자 번호에 해당하는 사용자를 찾을 수 없습니다.',
      });
    });
  });

  context('운동 참가 신청 취소 API를 요청할 경우', () => {
    it('RegisterApiService 신청자 상태를 취소로 변경하는 PATCH API 요청 호출', async () => {
      registerApiService.setAccessToken('userId 1');
      const registerId = 1;
      await registerStore.cancelRegisterToGame(registerId);
    });
  });

  context('운동 참가 취소 API를 요청할 경우', () => {
    it('RegisterApiService 신청자 상태를 취소로 변경하는 PATCH API 요청 호출', async () => {
      registerApiService.setAccessToken('userId 1');
      const registerId = 1;
      await registerStore.cancelParticipateToGame(registerId);
    });
  });

  context('운동 참가 수락 API를 요청할 경우', () => {
    it('RegisterApiService 신청자 상태를 참가로 변경하는 PATCH API 요청 호출', async () => {
      registerApiService.setAccessToken('userId 1');
      const registerId = 1;
      await registerStore.acceptRegister(registerId);
    });
  });

  context('운동 참가 거절 API를 요청할 경우', () => {
    it('RegisterApiService 신청자 상태를 거절로 변경하는 PATCH API 요청 호출', async () => {
      registerApiService.setAccessToken('userId 1');
      const registerId = 1;
      await registerStore.rejectRegister(registerId);
    });
  });
});

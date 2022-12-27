import context from 'jest-plugin-context';
import RegisterStore from './RegisterStore';

import { registerApiService } from '../services/RegisterApiService';

describe('RegisterStore', () => {
  let registerStore;

  beforeEach(() => {
    registerStore = new RegisterStore();
    registerApiService.setAccessToken('userId 1');
  });

  context('서버에 게시글 게임의 참가자 목록 데이터를 요청하는 API를 호출하면', () => {
    context('정상적으로 게임의 참가자 목록이 찾아졌을 경우', () => {
      const gameId = 1;

      it('서버에서 응답으로 전달된 참가자 목록을 상태로 저장', async () => {
        await registerStore.fetchMembers(gameId);

        const { members, membersServerError } = registerStore;

        expect(members.length).toBe(2);
        expect(members[0].userInformation.name).toBe('작성자');
        expect(members[1].userInformation.gender).toBe('여성');
        expect(membersServerError).toBeFalsy();
      });
    });

    context('참가 상태에 매칭되는 사용자가 찾아지지 않는 오류가 발생했을 경우', () => {
      const gameIdWithProblems = 444;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.fetchMembers(gameIdWithProblems);

        const { members, membersServerError } = registerStore;

        expect(members.length).toBe(0);
        expect(membersServerError).toBe('User Not Found');
      });
    });
  });

  context('서버에 게시글 게임의 신청자 목록 데이터를 요청하는 API를 호출하면', () => {
    context('정상적으로 게임의 신청자 목록이 찾아졌을 경우', () => {
      const gameId = 2;

      it('서버에서 응답으로 전달된 신청자 목록을 상태로 저장', async () => {
        await registerStore.fetchApplicants(gameId);

        const { applicants, applicantsServerError } = registerStore;

        expect(applicants.length).toBe(2);
        expect(applicants[0].userInformation.name).toBe('신청자 1');
        expect(applicants[1].userInformation.gender).toBe('남성');
        expect(applicantsServerError).toBeFalsy();
      });
    });

    context('참가 신청 상태에 맞는 사용자가 찾아지지 않는 오류가 발생했을 경우', () => {
      const gameIdWithProblems = 666;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.fetchApplicants(gameIdWithProblems);

        const { applicants, applicantsServerError } = registerStore;

        expect(applicants.length).toBe(0);
        expect(applicantsServerError).toBe('User Not Found');
      });
    });
  });

  context('운동 참가 신청 상태를 생성하는 요청 API를 호출할 경우', () => {
    const gameId = 1;

    context('서버에서 정상적으로 신청 상태를 생성했을 경우', () => {
      it('서버로부터 응답으로 전달받은 신청 상태가 속하는 gameId를 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(gameId);

        expect(registeredGameId).toBe(1);
        expect(registerStore.registerServerError).toBe('');
      });
    });

    context('잘못된 Access Token으로 요청했거나, 알림 생성을 위한 게시글 작성자 정보를 찾을 수 없는 경우', () => {
      beforeEach(() => {
        registerApiService.setAccessToken('wrong userId 4444');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장하고, '
        + 'gameId가 아닌 빈 값을 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(gameId);

        expect(registeredGameId).toBeFalsy();
        expect(registerStore.registerServerError)
          .toBe('사용자를 찾을 수 없습니다.');
      });
    });

    context('존재하지 않는 game Id로 요청했을 경우', () => {
      const wrongGameId = 6646;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장하고, '
      + 'gameId가 아닌 빈 값을 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(wrongGameId);

        expect(registeredGameId).toBeFalsy();
        expect(registerStore.registerServerError)
          .toBe('등록된 경기를 찾을 수 없습니다.');
      });
    });

    context('이미 참가 신청 중이었던 게임이었을 경우', () => {
      const alreadyJoinedGameId = 123;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장하고, '
      + 'gameId가 아닌 빈 값을 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(alreadyJoinedGameId);

        expect(registeredGameId).toBeFalsy();
        expect(registerStore.registerServerError)
          .toBe('이미 참가 신청 중이거나, 참가 신청이 완료된 경기입니다.');
      });
    });

    context('요청하는 시점에 참가 정원이 모두 차 있는 경우', () => {
      const alreadyFullGameId = 987;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장하고, '
      + 'gameId가 아닌 빈 값을 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(alreadyFullGameId);

        expect(registeredGameId).toBeFalsy();
        expect(registerStore.registerServerError)
          .toBe('정원이 모두 차 참가를 신청할 수 없습니다.');
      });
    });

    context('참가 신청을 완료했더라도 알림 생성을 위해 게임이 등록된 게시글을 찾을 수 없는 경우에는', () => {
      const postNotFoundGameId = 7272;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장하고, '
      + 'gameId가 아닌 빈 값을 호출한 대상에 반환', async () => {
        const registeredGameId = await registerStore.registerGame(postNotFoundGameId);

        expect(registeredGameId).toBeFalsy();
        expect(registerStore.registerServerError)
          .toBe('경기가 등록된 게시물을 찾을 수 없습니다.');
      });
    });
  });

  context('운동 참가 신청 취소, 또는 운동 참가 취소를 요청하는 API를 호출할 경우', () => {
    const registerId = 1;

    context('해당 신청 상태가 존재할 경우', () => {
      it('접속한 사용자의 신청 상태를 취소 상태로 변경하는 요청 호출', async () => {
        await registerStore.cancelRegisterGame(registerId);
        expect(registerStore.changeRegisterServerError).toBeFalsy();

        await registerStore.cancelParticipateGame(registerId);
        expect(registerStore.changeRegisterServerError).toBeFalsy();
      });
    });

    context('신청 상태가 존재하지 않는 오류가 있을 경우', () => {
      const notExistingRegisterId = 4455;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.cancelRegisterGame(notExistingRegisterId);
        expect(registerStore.changeRegisterServerError)
          .toBe('등록된 신청 상태를 찾을 수 없습니다.');

        await registerStore.cancelParticipateGame(notExistingRegisterId);
        expect(registerStore.changeRegisterServerError)
          .toBe('등록된 신청 상태를 찾을 수 없습니다.');
      });
    });

    context('신청 상태가 접속한 사용자에 해당하는 신청 상태가 아닌 오류가 있을 경우', () => {
      beforeEach(() => {
        registerApiService.setAccessToken('userId 4444');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.cancelRegisterGame(registerId);
        expect(registerStore.changeRegisterServerError)
          .toBe('신청 상태가 접속한 사용자의 신청 상태가 아닙니다.');

        await registerStore.cancelParticipateGame(registerId);
        expect(registerStore.changeRegisterServerError)
          .toBe('신청 상태가 접속한 사용자의 신청 상태가 아닙니다.');
      });
    });
  });

  context('운동 참가 신청 수락을 요청하는 API를 호출할 경우', () => {
    const registerId = 1;

    context('해당 신청 상태가 존재할 경우', () => {
      it('신청자의 신청 상태를 참가 상태로 변경하는 요청 호출', async () => {
        await registerStore.acceptRegister(registerId);

        expect(registerStore.changeRegisterServerError).toBeFalsy();
      });
    });

    context('신청 상태가 존재하지 않는 오류가 있을 경우', () => {
      const notExistingRegisterId = 4455;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.acceptRegister(notExistingRegisterId);

        expect(registerStore.changeRegisterServerError)
          .toBe('등록된 신청 상태를 찾을 수 없습니다.');
      });
    });

    context('신청 상태가 속한 게임이 존재하지 않는 오류가 있을 경우', () => {
      const registerIdWithoutGame = 273;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.acceptRegister(registerIdWithoutGame);

        expect(registerStore.changeRegisterServerError)
          .toBe('등록된 경기를 찾을 수 없습니다.');
      });
    });

    context('호출하는 시점에 신청 상태가 속한 게임 정원이 가득 차있는 경우', () => {
      const registerIdWithAlreadyFullGame = 555;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.acceptRegister(registerIdWithAlreadyFullGame);

        expect(registerStore.changeRegisterServerError)
          .toBe('정원이 모두 차 참가를 신청할 수 없습니다.');
      });
    });

    context('참가 신청 수락을 완료했더라도 알림 생성을 위해 신청 상태에 해당하는 사용자를 찾을 수 없는 경우에는', () => {
      const registerIdWithoutUser = 2580;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.acceptRegister(registerIdWithoutUser);

        expect(registerStore.changeRegisterServerError)
          .toBe('사용자를 찾을 수 없습니다.');
      });
    });
  });

  context('운동 참가 신청 거절을 요청하는 API를 호출할 경우', () => {
    const registerId = 1;

    context('해당 신청 상태가 존재할 경우', () => {
      it('신청자의 신청 상태를 거절 상태로 변경하는 요청 호출', async () => {
        await registerStore.rejectRegister(registerId);

        expect(registerStore.changeRegisterServerError).toBeFalsy();
      });
    });

    context('신청 상태가 존재하지 않는 오류가 있을 경우', () => {
      const notExistingRegisterId = 4455;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await registerStore.rejectRegister(notExistingRegisterId);

        expect(registerStore.changeRegisterServerError)
          .toBe('등록된 신청 상태를 찾을 수 없습니다.');
      });
    });
  });
});

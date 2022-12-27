import context from 'jest-plugin-context';
import { userApiService } from '../services/UserApiService';
import UserStore from './UserStore';

describe('UserStore', () => {
  let userStore;
  let spyLogin;

  beforeEach(() => {
    userStore = new UserStore();
    spyLogin = jest.spyOn(userStore, 'login');
    jest.clearAllMocks();
  });

  context('로그인을 수행하는 경우', () => {
    context('모든 정보를 정상적으로 입력하고 로그인 함수를 호출하면', () => {
      const username = 'hsjkdss228';
      const password = 'Password!1';

      it('userApiService의 postSession을 호출해 반환되는 Token 값을 반환', async () => {
        const verifiedAccessToken = await userStore.login({ username, password });
        expect(spyLogin).toBeCalledWith({ username, password });
        expect(verifiedAccessToken).toBe('TOKEN');
      });
    });

    context('아이디를 입력하지 않고 로그인 함수를 호출하면', () => {
      const username = '';
      const password = 'Password!1';

      it('에러 메세지를 상태로 저장 후 반환', async () => {
        await userStore.login({ username, password });
        expect(userStore.loginServerError).toBe('아이디를 입력해주세요.');
      });
    });

    context('존재하지 않는 아이디를 입력하고 로그인 함수를 호출하면', () => {
      const username = 'notexistingid12';
      const password = 'Password!1';

      it('에러 메세지를 상태로 저장 후 반환', async () => {
        await userStore.login({ username, password });
        expect(userStore.loginServerError).toBe('존재하지 않는 아이디입니다.');
      });
    });

    context('비밀번호를 입력하지 않고 로그인 함수를 호출하면', () => {
      const username = 'hsjkdss228';
      const password = '';

      it('에러 메세지를 상태로 저장 후 반환', async () => {
        await userStore.login({ username, password });
        expect(userStore.loginServerError).toBe('비밀번호를 입력해주세요.');
      });
    });

    context('잘못된 비밀번호를 입력하고 로그인 함수를 호출하면', () => {
      const username = 'hsjkdss228';
      const password = 'wrongPassword!1';

      it('에러 메세지를 상태로 저장 후 반환', async () => {
        await userStore.login({ username, password });
        expect(userStore.loginServerError).toBe('비밀번호가 일치하지 않습니다.');
      });
    });
  });

  context('로그인한 사용자의 이름을 요청하는 API를 호출하는 경우', () => {
    context('존재하는 사용자인 경우', () => {
      beforeEach(() => {
        userApiService.setAccessToken('userId 1');
      });

      it('응답으로 반환받은 사용자 이름을 상태로 저장', async () => {
        await userStore.fetchUserName();

        expect(userStore.name).toBe('황인우');
        expect(userStore.fetchUserNameServerError).toBeFalsy();
      });
    });

    context('존재하지 않는 사용자인 경우', () => {
      beforeEach(() => {
        userApiService.setAccessToken('not existing userId 333');
      });

      it('응답으로 반환받은 에러 메시지를 상태로 저장', async () => {
        await userStore.fetchUserName();

        expect(userStore.name).toBeFalsy();
        expect(userStore.fetchUserNameServerError).toBe('사용자를 찾을 수 없습니다.');
      });
    });
  });

  context('회원가입을 수행하는 경우', () => {
    const name = '황인우';
    const username = 'hsjkdss228';
    const password = 'Password!1';
    const confirmPassword = 'Password!1';
    const gender = '남성';
    const phoneNumber = '01012345678';

    context('모든 정보를 정상적으로 입력하고 회원가입 함수를 호출하면', () => {
      it('userApiService의 signUp을 호출해 생성되는 userId 값을 반환', async () => {
        const enrolledName = await userStore.signUp({
          name,
          username,
          password,
          confirmPassword,
          gender,
          phoneNumber,
        });

        const expectedEnrolledName = '황인우';
        expect(enrolledName).toBe(expectedEnrolledName);
        expect(userStore.signUpServerError).toBeFalsy();
      });
    });

    context('이미 등록된 아이디를 입력하고 회원가입 함수를 호출하면', () => {
      const wrongUsername = 'alreadyregisteredid12';

      it('응답으로 반환받은 에러 메시지를 상태로 저장', async () => {
        const enrolledName = await userStore.signUp({
          name,
          username: wrongUsername,
          password,
          confirmPassword,
          gender,
          phoneNumber,
        });

        expect(enrolledName).toBeFalsy();
        expect(userStore.signUpServerError).toBe('이미 등록된 아이디입니다.');
      });
    });

    context('비밀번호와 비밀번호 확인을 일치하지 않게 입력하고 회원가입 함수를 호출하면', () => {
      const mismatchingConfirmPassword = 'wrongPassword!1';

      it('응답으로 반환받은 에러 메시지를 상태로 저장', async () => {
        const enrolledName = await userStore.signUp({
          name,
          username,
          password,
          confirmPassword: mismatchingConfirmPassword,
          gender,
          phoneNumber,
        });

        expect(enrolledName).toBeFalsy();
        expect(userStore.signUpServerError).toBe('비밀번호 확인이 일치하지 않습니다.');
      });
    });
  });
});

import context from 'jest-plugin-context';
import UserStore from './UserStore';

import { userApiService } from '../services/UserApiService';

describe('UserStore', () => {
  let userStore;
  let spyPostSession;
  // let spyLogin;

  beforeEach(() => {
    userStore = new UserStore();
    spyPostSession = jest.spyOn(userApiService, 'postSession');
    jest.clearAllMocks();
  });

  context('모든 정보를 정상적으로 입력하고 로그인 함수를 호출하면', () => {
    const identifier = 'hsjkdss228';
    const password = 'Password!1';

    it('userApiService의 postSession을 호출해 반환되는 Token 값을 반환', async () => {
      await userStore.login({ identifier, password });
      expect(spyPostSession).toBeCalledWith({ identifier, password });
      expect(userStore.accessToken).toBe('TOKEN');
    });
  });

  context('아이디를 입력하지 않고 로그인 함수를 호출하면', () => {
    const identifier = '';
    const password = 'Password!1';

    it('에러 메세지를 상태로 저장 후 반환', async () => {
      await userStore.login({ identifier, password });
      expect(userStore.loginErrorMessage).toBe('아이디를 입력해주세요.');
    });
  });

  context('존재하지 않는 아이디를 입력하고 로그인 함수를 호출하면', () => {
    const identifier = 'notexistingid12';
    const password = 'Password!1';

    it('에러 메세지를 상태로 저장 후 반환', async () => {
      await userStore.login({ identifier, password });
      expect(userStore.loginErrorMessage).toBe('존재하지 않는 아이디입니다.');
    });
  });

  context('비밀번호를 입력하지 않고 로그인 함수를 호출하면', () => {
    const identifier = 'hsjkdss228';
    const password = '';

    it('에러 메세지를 상태로 저장 후 반환', async () => {
      await userStore.login({ identifier, password });
      expect(userStore.loginErrorMessage).toBe('비밀번호를 입력해주세요.');
    });
  });

  context('잘못된 비밀번호를 입력하고 로그인 함수를 호출하면', () => {
    const identifier = 'hsjkdss228';
    const password = 'wrongPassword!1';

    it('에러 메세지를 상태로 저장 후 반환', async () => {
      await userStore.login({ identifier, password });
      expect(userStore.loginErrorMessage).toBe('비밀번호가 일치하지 않습니다.');
    });
  });
});

import context from 'jest-plugin-context';
import UserStore from './UserStore';

import { userApiService } from '../services/UserApiService';

describe('UserStore', () => {
  let userStore;
  let spyPublish;
  let spyPostSession;
  let spyLogin;

  beforeEach(() => {
    userStore = new UserStore();
    spyPublish = jest.spyOn(userStore, 'publish');
    spyPostSession = jest.spyOn(userApiService, 'postSession');
    spyLogin = jest.spyOn(userStore, 'login');
    jest.clearAllMocks();
  });

  context('userId의 상태를 변경시키는 함수가 호출되면', () => {
    it('userId의 상태를 변경하고 publish', () => {
      expect(userStore.userId).toBe('');
      userStore.changeUserId(2);
      expect(userStore.userId).toBe(2);
      expect(spyPublish).toBeCalled();
    });
  });

  context('존재하는 userId로 로그인 함수가 호출되면', () => {
    it('userApiService의 postSession을 호출하면서 저장된 userId의 상태를 전달해'
      + '반환되는 Token 값을 상태로 저장 후 반환', async () => {
      userStore.changeUserId(10);
      await userStore.login();
      expect(spyPostSession).toBeCalledWith(10);
      expect(userStore.accessToken).toBe('TOKEN');

      expect(spyLogin).toReturn();
      // TODO: accessToken까지 들고 return하는지까지는 확인할 수는 없는 걸까?
      // expect(spyLogin).toReturnWith();
    });
  });

  context('userId를 입력하지 않은 채로 로그인 함수가 호출되면', () => {
    it('에러 메세지를 상태로 저장 후 반환', async () => {
      await userStore.login();
      expect(userStore.loginErrorMessage).toBe('user Id를 입력해주세요. (200)');
    });
  });

  context('존재하지 않는 userId로 로그인 함수가 호출되면', () => {
    it('에러 메세지를 상태로 저장 후 반환', async () => {
      userStore.changeUserId(4444);
      await userStore.login();
      expect(userStore.loginErrorMessage).toBe('존재하지 않는 user Id 입니다. (201)');
    });
  });

  context('userId로 로그인 함수가 호출되었는데 인코딩 과정에서 문제가 발생했으면', () => {
    it('에러 메세지를 상태로 저장 후 반환', async () => {
      userStore.changeUserId(1234);
      await userStore.login();
      expect(userStore.loginErrorMessage).toBe('user Id 인코딩 과정에서 문제가 발생했습니다. (202)');
    });
  });
});

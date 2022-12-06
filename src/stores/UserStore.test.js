import context from 'jest-plugin-context';
import UserStore from './UserStore';

describe('UserStore', () => {
  let userStore;
  let spyLogin;
  // let spyLogin;

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

  context('회원가입을 수행하는 경우', () => {
    context('모든 정보를 정상적으로 입력하고 회원가입 함수를 호출하면', () => {
      const name = '황인우';
      const username = 'hsjkdss228';
      const password = 'Password!1';
      const confirmPassword = 'Password!1';
      const gender = '남성';
      const phoneNumber = '01012345678';

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
      });
    });
  });
});

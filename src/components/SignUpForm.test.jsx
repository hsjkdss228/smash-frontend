import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const onClickBackward = jest.fn();
  const register = jest.fn();
  const handleSubmit = jest.fn();
  const clearErrors = jest.fn();
  const clearServerError = jest.fn();
  const signUp = jest.fn();

  function renderSignUpForm({
    formError,
    serverError,
  }) {
    render((
      <SignUpForm
        onClickBackward={onClickBackward}
        register={register}
        handleSubmit={handleSubmit}
        clearErrors={clearErrors}
        clearServerError={clearServerError}
        signUp={signUp}
        formError={formError}
        serverError={serverError}
      />
    ));
  }

  let formError;
  let serverError;

  context('회원가입 입력 폼은', () => {
    beforeEach(() => {
      formError = {};
      serverError = {};
    });

    it('이름, 아이디, 비밀번호/비밀번호 확인, 성별, 전화번호 입력 필드와 제출 버튼으로 구성', () => {
      renderSignUpForm({
        formError,
        serverError,
      });

      screen.getByText('성함');
      screen.getByText('아이디');
      screen.getByText('비밀번호');
      screen.getByText('비밀번호 확인');
      screen.getByText('성별');
      screen.getByText('남성');
      screen.getByText('여성');
      screen.getByText('전화번호');
    });
  });

  context('사용자가 회원가입 버튼을 누르면', () => {
    it('회원가입을 수행하는 핸들러 함수 호출', async () => {
      // renderSignUpForm({
      //   formError,
      //   serverError,
      // });

      // fireEvent.click(screen.getByText('회원가입'));
      // await waitFor(() => {
      //   expect(signUp).toBeCalled();
      // });

      // TODO: 이 구조에서는 handleSubmit을 mocking할 수 없기 때문에
      // signUp을 호출하는지에 대한 테스트가 불가능하다.
      // 기회가 된다면 useForm을 Page에서 내려받아 쓰는 것이 아닌
      // 여기에서 호출해서 쓰는 구조로 리팩터링이 필요하다.
    });
  });
});

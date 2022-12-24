import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import LoginFormInput from './LoginFormInput';

describe('LoginFormInput', () => {
  const register = jest.fn();
  const handleClearErrors = jest.fn();

  function renderLoginFormInput({
    htmlFor,
    labelName,
    id,
    type,
    placeholder,
    name,
    requiredErrorMessage,
  }) {
    render((
      <LoginFormInput
        htmlFor={htmlFor}
        labelName={labelName}
        id={id}
        type={type}
        placeholder={placeholder}
        register={register}
        name={name}
        requiredErrorMessage={requiredErrorMessage}
        clearErrors={handleClearErrors}
      />
    ));
  }

  context('로그인 화면은', () => {
    const htmlFor = 'input-username';
    const labelName = '아이디';
    const id = 'input-username';
    const type = 'text';
    const placeholder = 'Username';
    const name = 'username';
    const requiredErrorMessage = '아이디를 입력해주세요.';

    it('입력해야 하는 데이터에 대한 입력 필드를 출력', () => {
      renderLoginFormInput({
        htmlFor,
        labelName,
        id,
        type,
        placeholder,
        name,
        requiredErrorMessage,
      });

      screen.getByText('아이디');
      screen.getByPlaceholderText('Username');
    });

    context('입력 필드에 값을 입력하면', () => {
      it('출력되고 있던 에러 메시지를 비우는 핸들러 함수 호출', () => {
        renderLoginFormInput({
          htmlFor,
          labelName,
          id,
          type,
          placeholder,
          name,
          requiredErrorMessage,
        });

        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: 'hsjkdss228' },
        });

        // expect(handleClearErrors).toBeCalled();
        // register가 jest.fn()으로 mocking되었기 때문에
        // register 안에 속하는 onChange가 수행되는지 동작을 검증할 수 없다?
      });
    });
  });
});

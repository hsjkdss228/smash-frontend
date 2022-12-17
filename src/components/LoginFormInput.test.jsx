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
    requiredMessage,
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
        requiredMessage={requiredMessage}
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
    const requiredMessage = '아이디를 입력해주세요.';

    it('입력해야 하는 데이터에 대한 입력 필드를 출력', () => {
      renderLoginFormInput({
        htmlFor,
        labelName,
        id,
        type,
        placeholder,
        name,
        requiredMessage,
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
          requiredMessage,
        });

        fireEvent.change(screen.getByLabelText('아이디'), {
          target: { value: 'hsjkdss228' },
        });
        expect(handleClearErrors).toBeCalled();
      });
    });
  });
});

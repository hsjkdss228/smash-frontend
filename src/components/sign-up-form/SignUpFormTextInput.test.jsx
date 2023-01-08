import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import SignUpFormTextInput from './SignUpFormTextInput';

describe('SignUpFromTextInput', () => {
  const register = jest.fn();
  const clearErrors = jest.fn();
  const clearServerError = jest.fn();

  function renderSignUpFormTextInput({
    htmlFor,
    labelName,
    id,
    type,
    placeholder,
    formError,
    name,
    requiredErrorMessage,
    patternValue,
    patternErrorMessage,
    isTargetOfServerError,
    serverErrorMessageToSeen,
    serverErrorOccured,
  }) {
    render((
      <SignUpFormTextInput
        htmlFor={htmlFor}
        labelName={labelName}
        id={id}
        type={type}
        placeholder={placeholder}
        formError={formError}
        register={register}
        name={name}
        requiredErrorMessage={requiredErrorMessage}
        patternValue={patternValue}
        patternErrorMessage={patternErrorMessage}
        clearErrors={clearErrors}
        isTargetOfServerError={isTargetOfServerError}
        clearServerError={clearServerError}
        serverErrorMessageToSeen={serverErrorMessageToSeen}
        serverErrorOccured={serverErrorOccured}
      />
    ));
  }

  let htmlFor;
  let labelName;
  let id;
  let type;
  let placeholder;
  let formError;
  let name;
  let requiredErrorMessage;
  let patternValue;
  let patternErrorMessage;
  let isTargetOfServerError;
  let serverErrorMessageToSeen;
  let serverErrorOccured;

  beforeEach(() => {
    htmlFor = 'input-username';
    labelName = '아이디';
    id = 'input-username';
    type = 'text';
    placeholder = '영문 소문자/숫자를 포함해 4~16자 사이로 입력해주세요.';
    formError = {};
    name = 'username';
    requiredErrorMessage = '아이디를 입력해주세요.';
    patternValue = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,16}$/;
    patternErrorMessage = '영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.';
    isTargetOfServerError = true;
    serverErrorMessageToSeen = '이미 등록된 아이디입니다.';
    serverErrorOccured = '';
  });

  context('회원가입 화면의 각 입력 폼은', () => {
    it('label 및 입력란, 예외 메시지 발생 여부 값으로 구성됨', () => {
      renderSignUpFormTextInput({
        htmlFor,
        labelName,
        id,
        type,
        placeholder,
        formError,
        name,
        requiredErrorMessage,
        patternValue,
        patternErrorMessage,
        isTargetOfServerError,
        serverErrorMessageToSeen,
        serverErrorOccured,
      });

      screen.getByLabelText('아이디');
      screen.getByPlaceholderText('영문 소문자/숫자를 포함해 4~16자 사이로 입력해주세요.');
      expect(screen.queryByText('아이디를 입력해주세요.')).toBe(null);
      expect(screen.queryByText('영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.')).toBe(null);
      expect(screen.queryByText('이미 등록된 아이디입니다.')).toBe(null);
    });

    context('Form 예외 메시지가 같이 전달된 경우', () => {
      beforeEach(() => {
        formError = {
          username: {
            message: '아이디를 입력해주세요.',
          },
        };
      });

      it('예외 메시지를 입력란 하단에 출력', () => {
        renderSignUpFormTextInput({
          htmlFor,
          labelName,
          id,
          type,
          placeholder,
          formError,
          name,
          requiredErrorMessage,
          patternValue,
          patternErrorMessage,
          isTargetOfServerError,
          serverErrorMessageToSeen,
          serverErrorOccured,
        });

        screen.getByText('아이디를 입력해주세요.');
        expect(screen.queryByText('영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.')).toBe(null);
        expect(screen.queryByText('이미 등록된 아이디입니다.')).toBe(null);
      });
    });

    context('Server 예외 메시지가 같이 전달된 경우', () => {
      beforeEach(() => {
        serverErrorOccured = '이미 등록된 아이디입니다.';
      });

      it('예외 메시지를 입력란 하단에 출력', () => {
        renderSignUpFormTextInput({
          htmlFor,
          labelName,
          id,
          type,
          placeholder,
          formError,
          name,
          requiredErrorMessage,
          patternValue,
          patternErrorMessage,
          isTargetOfServerError,
          serverErrorMessageToSeen,
          serverErrorOccured,
        });

        screen.getByText('이미 등록된 아이디입니다.');
        expect(screen.queryByText('아이디를 입력해주세요.')).toBe(null);
        expect(screen.queryByText('영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.')).toBe(null);
      });
    });
  });
});

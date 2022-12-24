import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import SignUpFormGenderRadioButton from './SignUpFormGenderRadioButton';

describe('SignUpFromGenderRadioButton', () => {
  const register = jest.fn();
  const clearErrors = jest.fn();

  function renderSignUpFormGenderRadioButton({
    formError,
  }) {
    render((
      <SignUpFormGenderRadioButton
        formError={formError}
        register={register}
        clearErrors={clearErrors}
      />
    ));
  }

  let formError;

  beforeEach(() => {
    formError = {};
  });

  context('회원가입 화면의 입력 폼들 중 성별 선택 폼은', () => {
    it('label 및 성별 선택 라디오 버튼, 예외 메시지 발생 여부 값으로 구성됨', () => {
      renderSignUpFormGenderRadioButton({
        formError,
      });

      screen.getByLabelText('남성');
      screen.getByLabelText('여성');
      expect(screen.queryByText('성별을 선택해주세요')).toBe(null);
    });

    context('Form 예외 메시지가 같이 전달된 경우', () => {
      beforeEach(() => {
        formError = {
          gender: {
            message: '성별을 입력해주세요',
          },
        };
      });

      it('예외 메시지를 입력란 하단에 출력', () => {
        renderSignUpFormGenderRadioButton({
          formError,
        });

        screen.getByText('성별을 입력해주세요');
      });
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostLoginGuidance from './PostLoginGuidance';

describe('PostLoginGuidance', () => {
  const navigateLogin = jest.fn();
  const navigateSelectTrialAccount = jest.fn();

  function renderPostLoginGuidance() {
    render((
      <PostLoginGuidance
        navigateLogin={navigateLogin}
        navigateSelectTrialAccount={navigateSelectTrialAccount}
      />
    ));
  }

  context('비로그인 시 로그인 필요 안내 컴포넌트에는', () => {
    it('로그인 화면으로 이동, 체험 계정 선택 화면으로 이동 버튼이 존재', () => {
      renderPostLoginGuidance();

      screen.getByText('참가를 신청하려면 로그인이 필요합니다.');
      screen.getByText('로그인하기');
      screen.getByText('체험 계정 선택하기');
    });
  });

  context('로그인하기 버튼 클릭 시', () => {
    it('로그인 화면으로 이동하는 핸들러 함수 호출', () => {
      renderPostLoginGuidance();

      fireEvent.click(screen.getByText('로그인하기'));
      expect(navigateLogin).toBeCalled();
    });
  });

  context('체험 계정 선택하기 버튼 클릭 시', () => {
    it('체험 계정 선택 화면으로 이동하는 핸들러 함수 호출', () => {
      renderPostLoginGuidance();

      fireEvent.click(screen.getByText('체험 계정 선택하기'));
      expect(navigateSelectTrialAccount).toBeCalled();
    });
  });
});

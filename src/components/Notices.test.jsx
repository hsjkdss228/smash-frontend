import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Notices from './Notices';

jest.mock('./NoticeSettings', () => jest.fn());
jest.mock('./NoticeList', () => jest.fn());

describe('Notices', () => {
  const navigateBackward = jest.fn();

  function renderNotices() {
    render((
      <Notices
        navigateBackward={navigateBackward}
      />
    ));
  }

  context('알림 목록 전체 컴포넌트 화면에서 뒤로가기 버튼을 누르면', () => {
    it('뒤로 가기를 수행하게 하는 핸들러 함수 호출', () => {
      renderNotices();

      fireEvent.click(screen.getByText('뒤로가기'));
      expect(navigateBackward).toBeCalled();
    });
  });
});

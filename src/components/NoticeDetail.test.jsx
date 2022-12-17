import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticeDetail from './NoticeDetail';

const closeNoticeDetail = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  closeNoticeDetail,
}));

describe('NoticeDetail', () => {
  function renderNoticeDetail({
    notice,
    index,
  }) {
    render((
      <NoticeDetail
        notice={notice}
        index={index}
      />
    ));
  }

  // notice에 다른 속성들도 있지만 여기서는 detail 속성에만 집중할 것이기 때문에
  // detail 속성 값만 부여해도 괜찮을지도?
  context('알림 상세 내용이 전달되면', () => {
    const notice = {
      detail: '알림 상세 내용',
    };
    const index = 1;

    it('알림 상세 내용, 닫기 버튼을 화면에 출력', () => {
      renderNoticeDetail({
        notice,
        index,
      });

      screen.getByText('알림 상세 내용');
      screen.getByText('닫기');
    });

    context('닫기 버튼을 누르면', () => {
      it('알림의 열림 상태를 닫음으로 전환하는 NoticeStore의 함수 호출', () => {
        renderNoticeDetail({
          notice,
          index,
        });

        fireEvent.click(screen.getByText('닫기'));
        expect(closeNoticeDetail).toBeCalledWith(index);
      });
    });
  });
});

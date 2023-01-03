import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import NoticeTitle from './NoticeTitle';

const selectNotice = jest.fn();
const showNoticeDetail = jest.fn();
const readNotice = jest.fn();
jest.mock('../hooks/useNoticeStore', () => () => ({
  selectNotice,
  showNoticeDetail,
  readNotice,
}));

describe('NoticeTitle', () => {
  function renderNoticeTitle({
    notice,
    index,
    selectNoticeMode,
    isSelected,
    isDetailOpened,
  }) {
    render((
      <NoticeTitle
        notice={notice}
        index={index}
        selectNoticeMode={selectNoticeMode}
        isSelected={isSelected}
        isDetailOpened={isDetailOpened}
      />
    ));
  }

  const notice = {
    id: 1,
    status: 'read',
    createdAt: '2022-12-17T05:03:21.783Z',
    title: '알림 제목',
    detail: '알림 상세 내용',
  };
  const index = 1;
  let selectNoticeMode;
  let isSelected;
  let isDetailOpened;

  context('알림 선택 모드가 아니고 알림 상세 내용을 조회하는 경우가 아닌 경우', () => {
    beforeEach(() => {
      selectNoticeMode = false;
      isSelected = false;
      isDetailOpened = false;
    });

    it('알림 생성 시각과 알림 제목, 알림 조회 상태를 출력', () => {
      renderNoticeTitle({
        notice,
        index,
        selectNoticeMode,
        isSelected,
        isDetailOpened,
      });

      screen.getByText('2022-12-17 05:03:21');
      screen.getByText('알림 제목');
      expect(screen.queryByText('알림 상세 내용')).toBe(null);
    });

    context('알림이 읽지 않은 상태인 경우', () => {
      beforeEach(() => {
        notice.status = 'unread';
      });

      it('읽지 않은 상태임을 출력', () => {
        renderNoticeTitle({
          notice,
          index,
          selectNoticeMode,
          isSelected,
          isDetailOpened,
        });

        screen.getByText('읽지 않음');
      });
    });

    context('알림이 읽은 상태인 경우', () => {
      beforeEach(() => {
        notice.status = 'read';
      });

      it('읽은 상태임을 출력', () => {
        renderNoticeTitle({
          notice,
          index,
          selectNoticeMode,
          isSelected,
          isDetailOpened,
        });

        screen.getByText('읽음');
      });
    });

    context('해당 알림 제목을 클릭하면', () => {
      it('알림 상세 내용을 출력하고, 알림의 상태를 읽은 상태로 변경하는 핸들러 함수 호출', async () => {
        renderNoticeTitle({
          notice,
          index,
          selectNoticeMode,
          isSelected,
          isDetailOpened,
        });

        fireEvent.click(screen.getByText('알림 제목'));
        await waitFor(() => {
          expect(showNoticeDetail).toBeCalledWith(index);
          expect(readNotice).toBeCalledWith(index);
        });
      });
    });
  });

  context('알림 선택 모드가 아니고 알림 상세 내용을 조회하는 경우', () => {
    beforeEach(() => {
      selectNoticeMode = false;
      isSelected = false;
      isDetailOpened = true;
    });

    it('알림 생성 시각과 알림 제목에 알림 상세 내용을 같이 출력', () => {
      renderNoticeTitle({
        notice,
        index,
        selectNoticeMode,
        isSelected,
        isDetailOpened,
      });

      screen.getByText('2022-12-17 05:03:21');
      screen.getByText('알림 제목');
      screen.getByText('알림 상세 내용');
    });
  });

  context('알림 선택 모드인 경우', () => {
    context('체크상태인 경우', () => {
      beforeEach(() => {
        selectNoticeMode = true;
        isSelected = true;
        isDetailOpened = false;
      });

      it('알림 생성 시각과 알림 제목에 알림 선택 체크박스가 체크된 상태로 같이 출력', () => {
        renderNoticeTitle({
          notice,
          index,
          selectNoticeMode,
          isSelected,
          isDetailOpened,
        });

        screen.getByRole('checkbox', { checked: true });
        screen.getByText('2022-12-17 05:03:21');
        screen.getByText('알림 제목');
      });
    });
  });

  context('체크가 안 된 상태인 경우', () => {
    beforeEach(() => {
      selectNoticeMode = true;
      isSelected = false;
      isDetailOpened = false;
    });

    it('알림 생성 시각과 알림 제목에 알림 선택 체크박스가 체크가 안 된 상태로 같이 출력', () => {
      renderNoticeTitle({
        notice,
        index,
        selectNoticeMode,
        isSelected,
        isDetailOpened,
      });

      screen.getByRole('checkbox', { checked: false });
      screen.getByText('2022-12-17 05:03:21');
      screen.getByText('알림 제목');
    });
  });
});

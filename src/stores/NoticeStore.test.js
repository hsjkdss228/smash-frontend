import context from 'jest-plugin-context';
import { waitFor } from '@testing-library/react';
import NoticeStore from './NoticeStore';

import { noticeApiService } from '../services/NoticeApiService';

describe('NoticeStore', () => {
  let noticeStore;

  let spyInitNoticesDetailState;
  let spyInitSelectedNotices;
  let spyFetchNotices;
  let spyReadNotice;
  let spyReadSelectedNotices;
  let spyDeleteSelectedNotices;
  let spyFetchUnreadNoticeCount;

  beforeEach(() => {
    noticeStore = new NoticeStore();
    noticeApiService.setAccessToken('userId 1');

    spyInitNoticesDetailState = jest.spyOn(noticeStore, 'initNoticesDetailState');
    spyInitSelectedNotices = jest.spyOn(noticeStore, 'initSelectedNotices');

    spyFetchNotices = jest.spyOn(noticeStore, 'fetchNotices');
    spyReadNotice = jest.spyOn(noticeApiService, 'readNotice');
    spyReadSelectedNotices = jest.spyOn(noticeApiService, 'readSelectedNotices');
    spyDeleteSelectedNotices = jest.spyOn(noticeApiService, 'deleteSelectedNotices');
    spyFetchUnreadNoticeCount = jest.spyOn(noticeStore, 'fetchUnreadNoticeCount');

    jest.clearAllMocks();
  });

  // TODO: initNoticesDetailState, initSelectedNotices 테스트 작성

  context('알림 선택하기 모드 상태를 변경하는 경우', () => {
    it('알림 선택하기 모드 상태를 반대로 변경, '
      + '알림 선택하기 모드를 끄는 경우에는 선택된 알림 목록 상태 배열을 초기화', () => {
      expect(noticeStore.noticeStateToShow).toBe('all');
      expect(noticeStore.selectNoticeMode).toBe(false);

      noticeStore.toggleSelectNoticeMode();
      expect(noticeStore.selectNoticeMode).toBe(true);

      noticeStore.toggleSelectNoticeMode();
      expect(noticeStore.selectNoticeMode).toBe(false);
      expect(spyInitSelectedNotices).toBeCalled();
    });
  });

  context('모든 알림 조회하기 모드 상태를 활성화하는 경우', () => {
    it('출력할 알림 상태를 모든 알림 조회하기로 변경한 뒤 '
      + '서버에 알림 목록을 요청하는 함수 호출', async () => {
      expect(noticeStore.noticeStateToShow).toBe('all');
      await noticeStore.showAll();

      expect(noticeStore.noticeStateToShow).toBe('all');
      expect(spyFetchNotices).toBeCalled();
    });
  });

  context('읽지 않은 알림만 조회하기 모드 상태를 활성화하는 경우', () => {
    it('출력할 알림 상태를 읽지 않은 알림만 조회하기로 변경한 뒤 '
      + '서버에 알림 목록을 요청하는 함수 호출', async () => {
      expect(noticeStore.noticeStateToShow).toBe('all');
      await noticeStore.showUnreadOnly();

      expect(noticeStore.noticeStateToShow).toBe('unread');
      expect(spyFetchNotices).toBeCalled();
    });
  });

  context('알림 목록 페이지에 접속했을 때는 알림 선택하기 상태를 비활성화시키는 함수를 호출하는데, 이 경우', () => {
    beforeEach(() => {
      noticeStore.toggleSelectNoticeMode();
    });

    it('알림 선택하기 상태가 비활성화 상태로 변경됨', () => {
      expect(noticeStore.selectNoticeMode).toBeTruthy();

      noticeStore.closeSelectNoticeMode();
      expect(noticeStore.selectNoticeMode).toBeFalsy();
    });
  });

  context('서버에 알림 목록을 요청할 경우', () => {
    context('정상적인 Access Token으로 요청할 경우', () => {
      context('서버에서 응답으로 전달된 에러 메시지가 있었을 경우', () => {
        beforeEach(() => {
          noticeStore.serverError = 'Authentication Error';
        });

        it('에러 메시지를 비우고 요청을 시도', async () => {
          expect(noticeStore.serverError).toBeTruthy();

          await noticeStore.fetchNotices();

          expect(noticeStore.serverError).toBeFalsy();
        });
      });

      it('응답으로 전달받은 알림 목록을 이용해 전체 알림 목록 배열과 읽지 않은 알림 목록 배열을 생성해 상태로 저장, '
      + '상세 정보를 조회 중인 알림 상태 배열과 알림 선택 상태 배열은 초기화', async () => {
        await noticeStore.fetchNotices();

        expect(noticeStore.noticesAll.length).toBe(2);
        expect(noticeStore.noticesUnread.length).toBe(1);
        expect(spyInitNoticesDetailState).toBeCalled();
        expect(spyInitSelectedNotices).toBeCalled();
      });
    });

    context('잘못된 Access Token으로 요청할 경우', () => {
      beforeEach(() => {
        noticeApiService.setAccessToken('Wrong Access Token');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await noticeStore.fetchNotices();

        expect(noticeStore.serverError).toBe('Authentication Error');
        expect(noticeStore.noticesAll.length).toBe(0);
        expect(noticeStore.noticesUnread.length).toBe(0);
        expect(spyInitNoticesDetailState).not.toBeCalled();
        expect(spyInitSelectedNotices).not.toBeCalled();
      });
    });
  });

  context('모든 알림 선택, 모든 알림 선택 해제 시에는', () => {
    beforeEach(async () => {
      await noticeStore.fetchNotices();
    });

    context('사용될 알림 목록 배열은', () => {
      context('모든 알림 조회하기 모드 상태가 활성화되어 있는 경우에는', () => {
        it('모든 알림 목록 배열을 사용', () => {
          noticeStore.showAll();
          expect(noticeStore.chooseArrayForSelectionByStateToShow().length)
            .toBe(2);
        });
      });

      context('읽지 않은 알림만 조회하기 모드 상태가 활성화되어 있는 경우에는', () => {
        it('모든 알림 목록 배열을 사용', () => {
          noticeStore.showUnreadOnly();
          expect(noticeStore.chooseArrayForSelectionByStateToShow().length)
            .toBe(1);
        });
      });
    });

    context('모든 알림을 선택하면', () => {
      it('선택된 알림 목록 배열에 모든 알림들의 id를 추가', () => {
        noticeStore.selectAllNotices();

        noticeStore.selectedNotices.forEach((selectedNoticeId, index) => {
          expect(selectedNoticeId).toBe(noticeStore.noticesAll[index].id);
        });
      });
    });

    context('모든 알림을 선택 해제하면', () => {
      it('선택된 알림 목록 배열의 모든 index를 빈 값으로 설정', () => {
        noticeStore.deselectAllNotices();

        noticeStore.selectedNotices.forEach((selectedNoticeId) => {
          expect(selectedNoticeId).toBe('');
        });
      });
    });
  });

  context('특정 알림 선택/선택 해제 시에는', () => {
    beforeEach(async () => {
      await noticeStore.fetchNotices();
      noticeStore.toggleSelectNoticeMode();
    });

    const targetIndex = 0;
    const anotherIndex = 1;
    const targetId = 1;
    const anotherId = 2;

    context('해당 알림이 선택되어 있지 않은 상태인 경우', () => {
      it('해당 알림의 선택 상태를 선택되어 있는 상태로 변경', () => {
        noticeStore.selectNotice({ targetIndex, targetId });

        expect(noticeStore.selectedNotices[targetIndex]).toBe(targetId);
        expect(noticeStore.selectedNotices[anotherIndex]).toBeFalsy();
      });
    });

    context('해당 알림이 선택되어 있는 상태인 경우', () => {
      beforeEach(() => {
        noticeStore.selectNotice({ targetIndex, targetId });
      });

      it('해당 알림의 선택 상태를 선택되어 있지 않은 상태로 변경', () => {
        noticeStore.selectNotice({ targetIndex, targetId });

        expect(noticeStore.selectedNotices[targetIndex]).toBeFalsy();
      });
    });

    context('선택된 알림들에 대해', () => {
      beforeEach(() => {
        noticeStore.selectAllNotices();
      });

      context('해당 알림들을 읽은 상태로 변경하는 것을 서버에 요청할 경우', () => {
        it('서버에 요청을 수행한 뒤, 서버에 알림 목록을 다시 요청', async () => {
          await noticeStore.readSelectedNotices();

          await waitFor(() => {
            expect(spyReadSelectedNotices).toBeCalledWith({
              selectedNoticeIds: [targetId, anotherId],
            });
            expect(spyFetchNotices).toBeCalled();
          });
        });
      });

      context('해당 알림들을 삭제된 상태로 변경하는 것을 서버에 요청할 경우', () => {
        it('서버에 요청을 수행한 뒤, 서버에 알림 목록을 다시 요청', async () => {
          await noticeStore.deleteSelectedNotices();

          await waitFor(() => {
            expect(spyDeleteSelectedNotices).toBeCalledWith({
              selectedNoticeIds: [targetId, anotherId],
            });
            expect(spyFetchNotices).toBeCalled();
          });
        });
      });
    });
  });

  context('서버에 읽지 않은 알림 개수를 요청할 경우', () => {
    it('응답으로 전달받은 읽지 않은 알림 개수를 상태로 저장', async () => {
      await noticeStore.fetchUnreadNoticeCount();

      expect(noticeStore.unreadNoticeCount).toBe(1);
    });
  });

  context('특정 알림을 선택해 알림 상세 내용을 조회하면', () => {
    beforeEach(async () => {
      await noticeStore.fetchNotices();
    });

    it('상세 내용을 조회하고 있는 알림을 체크하는 배열의 상태를 해당 알림을 읽고 있는 것으로 갱신', () => {
      const targetIndex = 0;
      noticeStore.showNoticeDetail(targetIndex);

      expect(noticeStore.isOpenedNotice.length).toBe(2);
      expect(noticeStore.isOpenedNotice[0]).toBeTruthy();
      expect(noticeStore.isOpenedNotice[1]).toBeFalsy();
    });

    context('해당 알림이 읽지 않은 상태였다면', () => {
      it('서버에 해당 알림의 상태를 읽은 상태로 변경할 것을 요청한 뒤, '
        + '서버에 읽지 않은 알림 개수를 다시 요청', async () => {
        const targetId = 1;
        await noticeStore.readNotice(targetId);

        await waitFor(() => {
          expect(spyReadNotice).toBeCalledWith(targetId);
          expect(spyFetchUnreadNoticeCount).toBeCalled();
        });
      });
    });

    context('해당 알림이 읽은 상태였다면', () => {
      it('서버에 해당 알림의 상태 변경 요쳥이나 읽지 않은 알림 개수를 갱신 요청을 수행하지 않음', async () => {
        const targetId = 2;
        await noticeStore.readNotice(targetId);

        await waitFor(() => {
          expect(spyReadNotice).not.toBeCalledWith(targetId);
          expect(spyFetchUnreadNoticeCount).not.toBeCalled();
        });
      });
    });

    context('알림 상세 내용 조회 창을 닫으면', () => {
      it('상세 내용을 조회하고 있는 알림을 체크하는 배열의 상태를 모두 읽고 있지 않는 것으로 갱신', () => {
        const targetIndex = 1;
        noticeStore.showNoticeDetail(targetIndex);
        noticeStore.closeNoticeDetail(targetIndex);

        noticeStore.isOpenedNotice.forEach((showNoticeDetailStatus) => {
          expect(showNoticeDetailStatus).toBeFalsy();
        });
      });
    });
  });
});

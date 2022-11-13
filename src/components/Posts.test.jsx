import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const registerToGame = jest.fn();
  const cancelRegisterGame = jest.fn();

  const renderPosts = ({ posts, errorMessage }) => {
    render((
      <Posts
        posts={posts}
        errorMessage={errorMessage}
        registerToGame={registerToGame}
        cancelRegisterGame={cancelRegisterGame}
      />
    ));
  };

  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        hits: 100,
        game: {
          id: 1,
          type: '야구',
          date: '2022년 12월 19일 08:00~11:00',
          place: '잠실야구장',
          currentMemberCount: 4,
          targetMemberCount: 12,
          isRegistered: true,
        },
      },
      {
        id: 2,
        hits: 259,
        game: {
          id: 2,
          type: '족구',
          date: '2022년 12월 22일 19:00~20:00',
          place: '세종대학교 운동장',
          currentMemberCount: 7,
          targetMemberCount: 8,
          isRegistered: false,
        },
      },
    ];
    const errorMessage = '';

    it('각 게시물의 썸네일 출력', () => {
      renderPosts({ posts, errorMessage });

      screen.getByText('조회수: 100');
      screen.getByText(/2022년 12월 19일 08:00~11:00/);
      screen.getByText(/잠실야구장/);
      screen.getByText(/4/);

      screen.getByText('조회수: 259');
      screen.getByText(/2022년 12월 22일 19:00~20:00/);
      screen.getByText(/세종대학교 운동장/);
      screen.getByText(/7/);

      expect(screen.queryAllByText('신청').length).toBe(1);
      expect(screen.queryAllByText(/신청취소/).length).toBe(1);
    });

    context('신청 버튼 클릭 시', () => {
      it('운동 참가 신청 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderPosts({ posts, errorMessage });

        fireEvent.click(screen.getByText('신청'));
        const expectedGameId = 2;
        expect(registerToGame).toBeCalledWith(expectedGameId);
      });
    });

    context('신청 취소 버튼 클릭 시', () => {
      it('운동 참가 취소 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderPosts({ posts, errorMessage });

        fireEvent.click(screen.getByText('신청취소'));
        const expectedGameId = 1;
        expect(cancelRegisterGame).toBeCalledWith(expectedGameId);
      });
    });
  });

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];
    const errorMessage = '';

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({ posts, errorMessage });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const posts = [];
    const errorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';

    it('에러 메세지 출력', () => {
      renderPosts({ posts, errorMessage });

      screen.getByText(/주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다./);
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const registerToGame = jest.fn();

  const renderPosts = ({ posts }) => {
    render((
      <Posts
        posts={posts}
        registerToGame={registerToGame}
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

    it('각 게시물의 썸네일 출력', () => {
      renderPosts({ posts });

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
        renderPosts({ posts });

        fireEvent.click(screen.getByText('신청'));
        const expectedGameId = 2;
        expect(registerToGame).toBeCalledWith(expectedGameId);
      });
    });
  });

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts(posts);

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });
});

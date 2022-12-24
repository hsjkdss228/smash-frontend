import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

let posts;
const fetchPosts = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  posts,
  fetchPosts,
}));

describe('Posts', () => {
  const navigatePost = jest.fn();

  function renderPosts() {
    render((
      <Posts
        navigatePost={navigatePost}
      />
    ));
  }

  context('게시물 목록 컴포넌트는', () => {
    context('게시물 목록에 게시물이 존재할 경우', () => {
      beforeEach(() => {
        posts = [
          {
            id: 1,
            hits: 123,
            thumbnailImageUrl: 'imageUrl',
            isAuthor: false,
            game: {
              id: 1,
              type: '운동 종목 1',
              date: '2022년 12월 22일 오전 08:00 ~ 오전 10:00',
              currentMemberCount: 3,
              targetMemberCount: 6,
              registerId: null,
              registerStatus: 'none',
            },
            place: {
              name: '운동 장소 1',
            },
          },
          {
            id: 2,
            hits: 456,
            thumbnailImageUrl: 'imageUrl',
            isAuthor: true,
            game: {
              id: 2,
              type: '운동 종목 2',
              date: '2022년 12월 23일 오후 04:00 ~ 오후 08:00',
              currentMemberCount: 9,
              targetMemberCount: 12,
              registerId: 4,
              registerStatus: 'accepted',
            },
            place: {
              name: '운동 장소 2',
            },
          },
        ];
      });

      it('조회 방식 선택 영역, 게시글 목록 영역으로 구성', () => {
        renderPosts();

        screen.getByText('조회 방식 선택');
        screen.getByText('리스트');
        screen.getByText('지도');
        screen.getByText('운동 종목 1');
        screen.getByText('운동 종목 2');
      });
    });

    context('게시물 목록에 게시물이 존재하지 않을 경우', () => {
      beforeEach(() => {
        posts = [];
      });

      it('등록된 게시물이 존재하지 않는다는 메시지 출력', () => {
        renderPosts();

        screen.getByText('등록된 게시물이 존재하지 않습니다.');
      });
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const navigateToBackward = jest.fn();
  const navigateToPost = jest.fn();

  const renderPosts = ({
    posts,
    postsErrorMessage,
  }) => {
    render((
      <Posts
        posts={posts}
        navigateToBackward={navigateToBackward}
        navigateToPost={navigateToPost}
        postsErrorMessage={postsErrorMessage}
      />
    ));
  };

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];
    const postsErrorMessage = '';

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
      });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const posts = [];
    const postsErrorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';

    it('에러 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
      });

      screen.getByText(/주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다./);
    });
  });

  context('등록된 게시물이 있을 경우', () => {
    const posts = [
      {
        id: 1,
        hits: 334,
        isAuthor: false,
        game: {
          id: 2,
          type: '배드민턴',
          date: '2022년 10월 24일 13:00~16:00',
          place: '올림픽공원 핸드볼경기장',
          currentMemberCount: 4,
          targetMemberCount: 5,
          registerId: -1,
          registerStatus: 'none',
        },
      },
    ];
    const postsErrorMessage = '';

    it('뒤로가기 버튼을 누를 시 뒤로가기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
      });

      fireEvent.click(screen.getByText('⬅️'));
      expect(navigateToBackward).toBeCalled();
    });

    it('게시물 내용 클릭 시 해당 게시물 상세 정보 보기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
      });

      fireEvent.click(screen.getByText('배드민턴'));
      const expectedPostId = 1;
      expect(navigateToPost).toBeCalledWith(expectedPostId);
    });
  });
});

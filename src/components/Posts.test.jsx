import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const navigateToBackward = jest.fn();
  const navigateToPost = jest.fn();
  const registerToGame = jest.fn();
  const cancelRegisterToGame = jest.fn();
  const cancelParticipateToGame = jest.fn();

  const renderPosts = ({
    posts,
    postsErrorMessage,
    registerErrorCodeAndMessage,
  }) => {
    render((
      <Posts
        posts={posts}
        navigateToBackward={navigateToBackward}
        navigateToPost={navigateToPost}
        registerToGame={registerToGame}
        cancelRegisterToGame={cancelRegisterToGame}
        cancelParticipateToGame={cancelParticipateToGame}
        postsErrorMessage={postsErrorMessage}
        registerErrorCodeAndMessage={registerErrorCodeAndMessage}
      />
    ));
  };

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const posts = [];
    const postsErrorMessage = '';
    const registerErrorCodeAndMessage = {};

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const posts = [];
    const postsErrorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';
    const registerErrorCodeAndMessage = {};

    it('에러 메세지 출력', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
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
          type: '배드민턴',
          date: '2022년 10월 24일 13:00~16:00',
          place: '올림픽공원 핸드볼경기장',
          currentMemberCount: 4,
          targetMemberCount: 5,
          registerId: 10,
          registerStatus: 'accepted',
        },
      },
    ];
    const postsErrorMessage = '';
    const registerErrorCodeAndMessage = {};

    it('뒤로가기 버튼을 누를 시 뒤로가기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('⬅️'));
      expect(navigateToBackward).toBeCalled();
    });

    it('게시물 내용 클릭 시 해당 게시물 상세 정보 보기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      fireEvent.click(screen.getByText('배드민턴'));
      const expectedPostId = 1;
      expect(navigateToPost).toBeCalledWith(expectedPostId);
    });

    it('사용자가 버튼을 클릭하고 나서 에러가 전달되었을 시 에러 메세지를 출력', () => {
      const codeAndMessage = {
        code: 100,
        message: '에러 메세지 내용입니다.',
      };

      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage: codeAndMessage,
      });

      screen.getByText(/에러 메세지 내용입니다./);
    });
  });

  context('등록된 게시물이 있는데 작성자가 사용자 자신일 경우', () => {
    const posts = [
      {
        id: 1,
        hits: 334,
        isAuthor: true,
        game: {
          type: '주짓수',
          date: '2022년 10월 31일 08:00~11:00',
          place: '팀 레드 주짓수&MMA',
          currentMemberCount: 4,
          targetMemberCount: 5,
          registerId: 11,
          registerStatus: 'accepted',
        },
      },
    ];
    const postsErrorMessage = '';
    const registerErrorCodeAndMessage = {};

    it('해당 게시글 리스트 제목 옆에 신청/취소/참가취소 버튼이 나타나지 않음', () => {
      renderPosts({
        posts,
        postsErrorMessage,
        registerErrorCodeAndMessage,
      });

      expect(screen.queryByText('신청')).toBeNull();
      expect(screen.queryByText('신청취소')).toBeNull();
      expect(screen.queryByText('참가취소')).toBeNull();
    });
  });
});

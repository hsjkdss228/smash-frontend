import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Post from './Post';

describe('Post', () => {
  const renderPost = ({
    navigateToBackward,
    post,
    game,
    members,
  }) => {
    render((
      <Post
        navigateToBackward={navigateToBackward}
        post={post}
        game={game}
        members={members}
      />
    ));
  };

  context('게시글 정보가 아직 전달되지 않은 경우', () => {
    const post = {};
    const game = {};
    const members = [];

    it('게시글 정보를 불러오고 있다는 메세지 출력', () => {
      renderPost({
        post,
        game,
        members,
      });

      screen.getByText('정보를 불러오고 있습니다...');
    });
  });

  context('게시글 정보가 출력될 때 뒤로가기 버튼을 누른 경우', () => {
    const post = {
      id: 1,
      hits: 223,
      authorName: '작성자',
      authorPhoneNumber: '010-1111-2222',
      detail: '점심먹고 가볍게 탁구하실분?',
      isAuthor: true,
    };
    const game = {
      id: 1,
      type: '탁구',
      date: '2022년 10월 19일 12:30~13:30',
      place: '서울숲탁구클럽',
      currentMemberCount: 2,
      targetMemberCount: 4,
      isRegistered: true,
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-1111-2222',
      },
      {
        id: 2,
        name: '사용자 2',
        gender: '여성',
        phoneNumber: '010-9999-9999',
      },
    ];
    const navigateToBackward = jest.fn();

    it('뒤로가기로 이동하는 navigate 함수 호출', () => {
      renderPost({
        navigateToBackward,
        post,
        game,
        members,
      });

      fireEvent.click(screen.getByText('⬅️'));
      expect(navigateToBackward).toBeCalled();
    });
  });
});

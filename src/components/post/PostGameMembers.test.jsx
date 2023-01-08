import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostGameMembers from './PostGameMembers';

let post;
jest.mock('../hooks/usePostStore', () => () => ({
  post,
}));
let game;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
}));
let members;
jest.mock('../hooks/useRegisterStore', () => () => ({
  members,
}));

describe('PostGameMembers', () => {
  function renderPostGameMembers() {
    render((
      <PostGameMembers />
    ));
  }

  context('게시글 상세 정보 중 참가자 목록 컴포넌트에서는', () => {
    beforeEach(() => {
      post = {
        isAuthor: false,
      };
      game = {
        registerStatus: 'none',
      };
      members = [
        {
          registerId: 1,
          userInformation: {
            name: '조코비치',
            gender: '남성',
            phoneNumber: '010-9999-9999',
            profileImageUrl: 'Image Url 1',
            mannerScore: 10.0,
          },
        },
        {
          registerId: 2,
          userInformation: {
            name: '페더러',
            gender: '남성',
            phoneNumber: '010-4565-4565',
            profileImageUrl: 'Image Url 2',
            mannerScore: 1.0,
          },
        },
      ];
    });

    it('모든 참가자들의 정보가 출력됨', () => {
      renderPostGameMembers();

      screen.getByText('참가자 정보');
      expect(screen.getAllByText('남성').length).toBe(2);
    });

    context('접속한 사용자가 작성자라면', () => {
      beforeEach(() => {
        post = {
          isAuthor: true,
        };
        game = {
          registerStatus: 'accepted',
        };
      });

      it('팀 채팅방 입장하기 버튼이 출력됨', () => {
        renderPostGameMembers();

        screen.getByText('팀 채팅방 입장하기');
      });
    });

    context('접속한 사용자가 게시글의 운동에 참가 중이라면', () => {
      beforeEach(() => {
        post = {
          isAuthor: false,
        };
        game = {
          registerStatus: 'accepted',
        };
      });

      it('팀 채팅방 입장하기 버튼이 출력됨', () => {
        renderPostGameMembers();

        screen.getByText('팀 채팅방 입장하기');
      });
    });

    context('접속한 사용자가 게시글의 운동에 참가 중이 아니라면', () => {
      beforeEach(() => {
        post = {
          isAuthor: false,
        };
        game = {
          registerStatus: 'processing',
        };
      });

      it('팀 채팅방 입장하기 버튼이 출력되지 않음', () => {
        renderPostGameMembers();

        expect(screen.queryByText('팀 채팅방 입장하기')).toBe(null);
      });
    });
  });
});

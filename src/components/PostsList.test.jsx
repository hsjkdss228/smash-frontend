import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsList from './PostsList';

describe('PostsList', () => {
  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        author: '작성자 1',
        detail: '동네 야구대회 나가실 분 모집합니다',
        membersCount: 4,
        targetMembersCount: 12,
        positions: [
          {
            id: 1,
            name: '투수',
            currentParticipants: 0,
            targetParticipantsCount: 3,
          },
          {
            id: 2,
            name: '내야수',
            currentParticipants: 2,
            targetParticipantsCount: 5,
          },
          {
            id: 3,
            name: '외야수',
            currentParticipants: 2,
            targetParticipantsCount: 4,
          },
        ],
      },
      {
        id: 3,
        author: '작성자 2',
        detail: '풋살마렵네 재야의 고수들 모여라',
        membersCount: 5,
        targetMembersCount: 6,
        positions: [
          {
            id: 4,
            name: '자유포지션',
            currentParticipants: 5,
            targetParticipantsCount: 6,
          },
        ],
      },
    ];

    it('썸네일 출력', () => {
      render((
        <PostsList
          posts={posts}
        />
      ));

      screen.getByText(/작성자 1/);
      screen.getByText(/4명\/12명/);
      screen.getByText(/투수/);
      screen.getByText(/내야수/);
      screen.getByText(/외야수/);

      screen.getByText(/작성자 2/);
      screen.getByText(/5명\/6명/);
      screen.getByText(/자유포지션/);
    });
  });
});

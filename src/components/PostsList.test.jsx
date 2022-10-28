import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsList from './PostsList';

describe('PostsList', () => {
  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        detail: '한화 상대로 함께 경기 뛸 인원 모집합니다.',
        participants: [
          { id: 1, name: '참가자 1' },
          { id: 2, name: '참가자 2' },
        ],
      },
      {
        id: 2,
        detail: '모집한다고',
        participants: [
          { id: 1, name: '참가자 1' },
          { id: 2, name: '참가자 2' },
          { id: 3, name: '참가자 3' },
          { id: 4, name: '참가자 4' },
          { id: 5, name: '참가자 5' },
        ],
      },
    ];

    it('애플리케이션 이름, 운동 선택하기, 사이드바 메뉴 펼치기 버튼 존재', () => {
      render((
        <PostsList
          posts={posts}
        />
      ));

      screen.getByText(/한화 상대로 함께 경기 뛸 인원 모집합니다/);
      screen.getByText(/참가인원: 2명/);

      screen.getByText(/모집한다고/);
      screen.getByText(/참가인원: 5명/);
    });
  });
});

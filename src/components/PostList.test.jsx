import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostList from './PostList';

describe('PostList', () => {
  context('등록된 게시글이 존재하는 경우', () => {
    const posts = [
      {
        id: 1,
        postType: '인원 모집',
        author: '작성자 1',
        createdAt: '10/22 18:00:33',
        hits: 15,
        thumbnailImageUrl: '썸네일 이미지 Url 1',
        exercise: '야구',
        exerciseDate: '11/1 18:00~21:00',
        exerciseType: '연습경기',
        exerciseLevel: '초보',
        exerciseGender: '남성',
        averageMannerScore: 8.4,
        cost: 10000,
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
        place: '구의야구공원',
      },
      {
        id: 3,
        postType: '선수 모집',
        author: '작성자 2',
        createdAt: '10/25 18:00:00',
        hits: 220,
        thumbnailImageUrl: '썸네일 이미지 Url 2',
        exercise: '풋살',
        exerciseDate: '11/2 15:00~17:00',
        exerciseType: '경기',
        exerciseLevel: '선출',
        exerciseGender: '혼성',
        averageMannerScore: 9,
        cost: 5000,
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
        place: '자양중학교',
      },
    ];

    it('썸네일 출력', () => {
      render((
        <PostList
          posts={posts}
        />
      ));

      screen.getByText(/11\/1 18:00~21:00/);
      screen.getByText(/구의야구공원/);
      screen.getByText(/작성자 1/);
      screen.getByText(/평균 매너점수: 8.4점/);
      screen.getByText(/4명\/12명/);
      screen.getByText(/투수/);
      screen.getByText(/내야수/);
      screen.getByText(/외야수/);

      screen.getByText(/조회수: 15회/);
      screen.getByText('야구');
      screen.getByText(/인원 모집/);
      screen.getByText('연습경기');
      screen.getByText(/초보/);
      screen.getByText('남성');
      screen.getByText(/참가비: 10,000원/);

      screen.getByText(/11\/2 15:00~17:00/);
      screen.getByText(/자양중학교/);
      screen.getByText(/작성자 2/);
      screen.getByText(/평균 매너점수: 9점/);
      screen.getByText(/5명\/6명/);
      screen.getByText(/자유포지션/);

      screen.getByText(/조회수: 220회/);
      screen.getByText('풋살');
      screen.getByText(/인원 모집/);
      screen.getByText('경기');
      screen.getByText(/선출/);
      screen.getByText('혼성');
      screen.getByText(/참가비: 5,000원/);
    });
  });
});

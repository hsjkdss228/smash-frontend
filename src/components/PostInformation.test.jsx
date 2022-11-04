import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostInformation from './PostInformation';

describe('게시물 정보 컴포넌트', () => {
  context('게시물 정보 컴포넌트 내용을 받아온 경우', () => {
    const information = {
      postId: 1,
      exerciseDate: '11/1 18:00~21:00',
      placeName: '구의야구공원',
      hits: 15,
      exercise: '야구',
      postType: '선수 모집',
      averageMannerScore: 8.4,
      author: '작성자 1',
      createdAt: '10:22 18:00:33',
      detail: '운동 모집 글 내용입니다.',
      images: [
        { id: 1, url: 'Image Url 1', isThumbnailImage: false },
        { id: 2, url: 'Image Url 3', isThumbnailImage: true },
      ],
      exerciseType: '연습경기',
      exerciseLevel: '연습경기',
      exerciseGender: '연습경기',
      currentTotalParticipants: 6,
      targetTotalParticipantsCount: 24,
      cost: 5000,
    };

    it('화면에 게시글의 모든 내용을 출력', () => {
      render((
        <PostInformation
          information={information}
        />
      ));

      screen.getByText(/조회수: 15회/);
      screen.getByText(/작성자 1/);
      screen.getByText(/운동 모집 글 내용입니다./);
      screen.getByText(/6\/24명/);
      screen.getByText(/참가비: 5,000원/);
    });
  });
});

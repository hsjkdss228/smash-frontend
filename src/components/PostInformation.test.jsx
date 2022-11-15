import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostInformation from './PostInformation';

describe('PostInformation', () => {
  const renderPostInformation = ({
    hits,
    authorName,
    authorPhoneNumber,
    detail,
  }) => {
    render((
      <PostInformation
        hits={hits}
        authorName={authorName}
        authorPhoneNumber={authorPhoneNumber}
        detail={detail}
      />
    ));
  };

  context('게시글 정보가 전달된 경우', () => {
    const hits = 15;
    const authorName = '사용자 1';
    const authorPhoneNumber = '010-1234-5678';
    const detail = '사용자 1이 쓴 운동 모집 게시글의 내용입니다.';

    it('게시글 정보를 출력', () => {
      renderPostInformation({
        hits,
        authorName,
        authorPhoneNumber,
        detail,
      });

      screen.getByText('조회수: 15');
      screen.getByText('작성자: 사용자 1');
      screen.getByText('작성자 연락처: 010-1234-5678');
      screen.getByText('사용자 1이 쓴 운동 모집 게시글의 내용입니다.');
    });
  });
});

import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostAuthor from './PostAuthor';

describe('PostAuthor', () => {
  const renderPostAuthor = ({
    authorName,
    authorPhoneNumber,
  }) => {
    render((
      <PostAuthor
        authorName={authorName}
        authorPhoneNumber={authorPhoneNumber}
      />
    ));
  };

  context('작성자 정보가 전달된 경우', () => {
    const authorName = '사용자 1';
    const authorPhoneNumber = '010-1234-5678';

    it('작성자 정보를 출력', () => {
      renderPostAuthor({
        authorName,
        authorPhoneNumber,
      });

      screen.getByText('사용자 1');
      screen.getByText('010-1234-5678');
    });
  });
});

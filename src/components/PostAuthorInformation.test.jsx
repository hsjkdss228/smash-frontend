import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostAuthorInformation from './PostAuthorInformation';

describe('PostAuthorInformation', () => {
  const renderPostAuthorInformation = ({
    authorName,
    authorPhoneNumber,
  }) => {
    render((
      <PostAuthorInformation
        authorName={authorName}
        authorPhoneNumber={authorPhoneNumber}
      />
    ));
  };

  context('작성자 정보가 전달된 경우', () => {
    const authorName = '사용자 1';
    const authorPhoneNumber = '010-1234-5678';

    it('작성자 정보를 출력', () => {
      renderPostAuthorInformation({
        authorName,
        authorPhoneNumber,
      });

      screen.getByText('사용자 1');
      screen.getByText('010-1234-5678');
    });
  });
});

import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostMemberInformation from './PostMemberInformation';

describe('PostMemberInformation', () => {
  const renderPostMemberInformation = ({ members }) => {
    render((
      <PostMemberInformation
        members={members}
      />
    ));
  };

  context('경기 정보가 전달된 경우', () => {
    const members = [
      {
        id: 1,
        name: '조코비치',
        gender: '남성',
        phoneNumber: '010-1234-5678',
      },
      {
        id: 2,
        name: '페더러',
        gender: '남성',
        phoneNumber: '010-8765-4321',
      },
    ];

    it('경기 정보를 출력', () => {
      renderPostMemberInformation({ members });

      screen.getByText('참가자 정보');
      screen.getByText('조코비치');
      screen.getByText('010-8765-4321');
      expect(screen.getAllByText('남성').length).toBe(2);
    });
  });
});

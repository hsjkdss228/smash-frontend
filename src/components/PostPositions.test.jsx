import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostPositions from './PostPositions';

describe('게시물 정보 컴포넌트', () => {
  context('게시물 정보 컴포넌트 내용을 받아온 경우', () => {
    const teamsAndPositions = [
      {
        id: 1,
        name: '1팀',
        membersCount: 4,
        targetMembersCount: 12,
        positions: [
          {
            id: 1,
            teamId: 1,
            name: '투수',
            currentParticipants: 3,
            targetParticipantsCount: 3,
            members: [
              {
                id: 1,
                positionId: 1,
                name: '참가자 1',
                mannerScore: 7.5,
              },
              {
                id: 2,
                positionId: 1,
                name: '참가자 2',
                mannerScore: 3.3,
              },
              {
                id: 3,
                positionId: 1,
                name: '참가자 3',
                mannerScore: 5,
              },
            ],
          },
          {
            id: 2,
            teamId: 1,
            name: '내야수',
            currentParticipants: 1,
            targetParticipantsCount: 5,
            members: [
              {
                id: 4,
                positionId: 2,
                name: '참가자 4',
                mannerScore: 2,
              },
            ],
          },
          {
            id: 3,
            teamId: 1,
            name: '외야수',
            currentParticipants: 0,
            targetParticipantsCount: 4,
            members: [],
          },
        ],
      },
      {
        id: 2,
        name: '2팀',
        membersCount: 2,
        targetMembersCount: 12,
        positions: [
          {
            id: 4,
            teamId: 2,
            name: '자유포지션',
            currentParticipants: 2,
            targetParticipantsCount: 12,
            members: [
              {
                id: 11,
                positionId: 2,
                name: '참가자 11',
                mannerScore: 6.9,
              },
              {
                id: 12,
                positionId: 2,
                name: '참가자 12',
                mannerScore: 8.8,
              },
            ],
          },
        ],
      },
    ];

    it('화면에 게시글의 모든 내용을 출력', () => {
      render((
        <PostPositions
          teamsAndPositions={teamsAndPositions}
        />
      ));

      screen.getByText(/1팀/);
      screen.getByText(/4\/12명/);

      screen.getByText(/투수/);
      screen.getByText('참가자 1');
      screen.getByText(/참가자 2/);
      screen.getByText(/참가자 3/);

      screen.getByText(/내야수/);
      screen.getByText(/참가자 4/);

      screen.getByText(/외야수/);

      screen.getByText(/2팀/);
      screen.getByText(/2\/12명/);

      screen.getByText(/자유포지션/);
      screen.getByText(/참가자 11/);
      screen.getByText(/참가자 12/);

      expect(screen.getAllByText(/명 신청 중/).length).toBe(4);
      expect(screen.getAllByText(/매너점수:/).length).toBe(6);
      expect(screen.getAllByText(/신청하기/).length).toBe(3);
    });
  });
});

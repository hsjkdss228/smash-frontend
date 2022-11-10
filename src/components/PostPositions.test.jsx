import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostPositions from './PostPositions';

describe('게시물 정보 컴포넌트', () => {
  context('게시물 정보 컴포넌트 내용을 받아온 경우', () => {
    context('현재 접속자가 게시글에 신청하지 않은 사용자인 경우', () => {
      const teamsAndPositions = {
        gameId: 1,
        userStatus: 'isNotRegistered',
        roleIdOfAccessedUser: 0,
        teams: [{
          id: 1,
          name: '1팀',
          membersCount: 4,
          targetMembersCount: 12,
          roles: [
            {
              id: 1,
              teamId: 1,
              name: '투수',
              currentParticipants: 3,
              targetParticipantsCount: 3,
              members: [
                {
                  id: 1,
                  roleId: 1,
                  name: '참가자 1',
                  mannerScore: 7.5,
                },
                {
                  id: 2,
                  roleId: 1,
                  name: '참가자 2',
                  mannerScore: 3.3,
                },
                {
                  id: 3,
                  roleId: 1,
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
                  roleId: 2,
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
          roles: [
            {
              id: 4,
              teamId: 2,
              name: '자유포지션',
              currentParticipants: 2,
              targetParticipantsCount: 12,
              members: [
                {
                  id: 11,
                  roleId: 2,
                  name: '참가자 11',
                  mannerScore: 6.9,
                },
                {
                  id: 12,
                  roleId: 2,
                  name: '참가자 12',
                  mannerScore: 8.8,
                },
              ],
            },
          ],
        }],
      };

      it('화면에 게시글의 내용을 출력하고 모든 포지션에 신청하기 버튼을 출력', () => {
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

    context('현재 접속자가 게시글에 신청한 사용자인 경우', () => {
      const teamsAndPositions = {
        userStatus: 'isRegistered',
        roleIdOfAccessedUser: 2,
        teams: [{
          id: 1,
          name: '1팀',
          membersCount: 1,
          targetMembersCount: 5,
          roles: [
            {
              id: 1,
              teamId: 1,
              name: '세터',
              currentParticipants: 0,
              targetParticipantsCount: 2,
              members: [],
            },
            {
              id: 2,
              teamId: 1,
              name: '리시버',
              currentParticipants: 1,
              targetParticipantsCount: 2,
              members: [
                {
                  id: 1,
                  roleId: 2,
                  name: '배구참가자',
                  mannerScore: 10,
                },
              ],
            },
            {
              id: 3,
              teamId: 1,
              name: '리베로',
              currentParticipants: 0,
              targetParticipantsCount: 1,
              members: [],
            },
          ],
        },
        {
          id: 2,
          name: '2팀',
          membersCount: 1,
          targetMembersCount: 5,
          roles: [
            {
              id: 4,
              teamId: 2,
              name: '자유포지션',
              currentParticipants: 1,
              targetParticipantsCount: 5,
              members: [
                {
                  id: 11,
                  roleId: 2,
                  name: '참가자 11',
                  mannerScore: 6.9,
                },
              ],
            },
          ],
        }],
      };

      it('자신이 신청한 포지션에는 신청취소 버튼이 출력되고 다른 포지션에는 버튼이 출력되지 않음', () => {
        render((
          <PostPositions
            teamsAndPositions={teamsAndPositions}
          />
        ));

        expect(screen.queryAllByText(/신청하기/).length).toBe(0);
        screen.getByText(/신청취소/);
      });
    });
  });
});

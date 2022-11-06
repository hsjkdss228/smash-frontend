/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/posts/list`, (request, response, context) => (
    response(context.json({
      posts: [
        {
          id: 1,
          type: '선수 모집',
          author: '야구선수 1',
          createdAt: '10/22 18:00:33',
          hits: 15,
          detail: '동네 야구대회 나가실 분 모집합니다',
          images: [
            { id: 1, url: 'Image Url 1', isThumbnailImage: false },
            { id: 2, url: 'Image Url 2', isThumbnailImage: false },
            { id: 3, url: 'Image Url 3', isThumbnailImage: true },
          ],
          game: {
            id: 1,
            postId: 1,
            exercise: '야구',
            exerciseDate: '10월 15일 오후 2시~5시',
            exerciseType: '연습경기',
            exerciseLevel: '초보',
            exerciseGender: '남성',
            cost: 10000,
            place: '구의야구공원',
            teams: [
              {
                id: 1,
                gameId: 1,
                name: '1팀',
                membersCount: 2,
                targetMembersCount: 12,
                roles: [
                  {
                    id: 1,
                    teamId: 1,
                    name: '투수',
                    currentParticipants: 1,
                    targetParticipantsCount: 3,
                    members: [
                      {
                        id: 1,
                        teamId: 1,
                        roleId: 1,
                        name: '황인우',
                        mannerScore: 10.0,
                      },
                    ],
                  },
                  {
                    id: 2,
                    teamId: 1,
                    name: '야수',
                    currentParticipants: 1,
                    targetParticipantsCount: 9,
                    members: [
                      {
                        id: 2,
                        teamId: 1,
                        roleId: 2,
                        name: '조성환',
                        mannerScore: 7.1,
                      },
                    ],
                  },
                ],
              },
              {
                id: 2,
                gameId: 1,
                name: '2팀',
                membersCount: 2,
                targetMembersCount: 12,
                roles: [
                  {
                    id: 3,
                    teamId: 2,
                    name: '포지션무관',
                    currentParticipants: 2,
                    targetParticipantsCount: 12,
                    members: [
                      {
                        id: 3,
                        teamId: 2,
                        roleId: 3,
                        name: '전민지',
                        mannerScore: 5.2,
                      },
                      {
                        id: 4,
                        teamId: 2,
                        roleId: 3,
                        name: '김명훈',
                        mannerScore: 6.7,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          id: 2,
          type: '선수 모집',
          author: '황인우',
          createdAt: '10월 15일 오전 9시',
          hits: 127,
          detail: '광진축구대회 같이 뛰실 분 모집합니다!',
          images: [
            {
              id: 3,
              postId: 2,
              url: 'image url 3',
              isThumbnailImage: true,
            },
          ],
          game: {
            id: 2,
            postId: 2,
            exercise: '축구',
            exerciseDate: '10월 25일 오전 9시~11시',
            exerciseType: '경기',
            exerciseLevel: '중상급',
            exerciseGender: '남성',
            cost: 9000,
            place: '자양중학교',
            teams: [
              {
                id: 3,
                gameId: 2,
                name: '광진1팀',
                membersCount: 4,
                targetMembersCount: 11,
                roles: [
                  {
                    id: 4,
                    teamId: 3,
                    name: '필드플레이어',
                    currentParticipants: 3,
                    targetParticipantsCount: 11,
                    members: [
                      {
                        id: 6,
                        teamId: 3,
                        roleId: 4,
                        name: '노승준',
                        mannerScore: 5.0,
                      },
                      {
                        id: 7,
                        teamId: 3,
                        roleId: 4,
                        name: '전민지',
                        mannerScore: 5.2,
                      },
                      {
                        id: 8,
                        teamId: 3,
                        roleId: 4,
                        name: '조성환',
                        mannerScore: 7.1,
                      },
                    ],
                  },
                  {
                    id: 5,
                    teamId: 3,
                    name: '골키퍼',
                    currentParticipants: 1,
                    targetParticipantsCount: 2,
                    members: [
                      {
                        id: 5,
                        teamId: 3,
                        roleId: 5,
                        name: '황인우',
                        mannerScore: 10.0,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    })))),

  rest.get(`${apiBaseUrl}/posts/:postId`, async (request, response, context) => {
    const { postId } = await request.params;
    const accessToken = await request.headers.get('Authorization');

    if (postId === '1' && accessToken) {
      return response(context.json({
        id: 1,
        type: '선수 모집',
        author: '황인우',
        createdAt: '10/22 18:00:33',
        hits: 15,
        detail: '동네 야구대회 나가실 분 모집합니다',
        images: [
          { id: 1, url: 'Image Url 1', isThumbnailImage: false },
          { id: 2, url: 'Image Url 2', isThumbnailImage: false },
          { id: 3, url: 'Image Url 3', isThumbnailImage: true },
        ],
        game: {
          id: 1,
          postId: 1,
          exercise: '야구',
          exerciseDate: '10월 15일 오후 2시~5시',
          exerciseType: '연습경기',
          exerciseLevel: '초보',
          exerciseGender: '남성',
          cost: 10000,
          place: '구의야구공원',
          teams: [
            {
              id: 1,
              gameId: 1,
              name: '1팀',
              membersCount: 2,
              targetMembersCount: 12,
              roles: [
                {
                  id: 1,
                  teamId: 1,
                  name: '투수',
                  currentParticipants: 1,
                  targetParticipantsCount: 3,
                  members: [
                    {
                      id: 1,
                      teamId: 1,
                      roleId: 1,
                      name: '황인우',
                      mannerScore: 10.0,
                    },
                  ],
                },
                {
                  id: 2,
                  teamId: 1,
                  name: '야수',
                  currentParticipants: 1,
                  targetParticipantsCount: 9,
                  members: [
                    {
                      id: 2,
                      teamId: 1,
                      roleId: 2,
                      name: '조성환',
                      mannerScore: 7.1,
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              gameId: 1,
              name: '2팀',
              membersCount: 2,
              targetMembersCount: 12,
              roles: [
                {
                  id: 3,
                  teamId: 2,
                  name: '포지션무관',
                  currentParticipants: 2,
                  targetParticipantsCount: 12,
                  members: [
                    {
                      id: 3,
                      teamId: 2,
                      roleId: 3,
                      name: '전민지',
                      mannerScore: 5.2,
                    },
                    {
                      id: 4,
                      teamId: 2,
                      roleId: 3,
                      name: '김명훈',
                      mannerScore: 6.7,
                    },
                  ],
                },
              ],
            },
          ],
          userStatus: 'isAuthor',
          roleIdOfAccessedUser: 1,
        },
      }));
    }

    return response(context.status(400));
  }),
);

export default server;

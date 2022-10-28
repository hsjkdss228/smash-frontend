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
          detail: '롯데 자이언츠 선수단과 함께하는 야구한판',
          participants: [
            { id: 1, name: '김주찬' },
            { id: 2, name: '조성환' },
            { id: 3, name: '홍성흔' },
            { id: 4, name: '가르시아' },
          ],
        },
        {
          id: 7,
          detail: '볼링 한겜 고고씽',
          participants: [
            { id: 1, name: '리트리버' },
            { id: 2, name: '물트리버' },
          ],
        },
      ],
    })))),
);

export default server;

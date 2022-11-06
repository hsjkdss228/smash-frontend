import context from 'jest-plugin-context';
import PostStore from './PostStore';

import server from '../testServer';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('PostStore', () => {
  const postStore = new PostStore();

  context('API 서버에 게시글 리스트 데이터를 요청할 경우', () => {
    it('백엔드 서버에서 응답으로 전달된 post 리스트를 상태로 저장', async () => {
      await postStore.fetchPosts();

      const { posts } = postStore;

      const postLength = Object.keys(posts[0]).length;

      expect(postLength).toBe(8);
      expect(posts.length).toBe(2);
      expect(posts[0].game.teams.length).toBe(2);
      expect(posts[1].game.teams[0].roles.length).toBe(2);
      expect(posts[1].game.teams[0].roles[0].members.length).toBe(3);
    });
  });

  context('API 서버에 특정 게시글의 상세 데이터를 요청할 경우', () => {
    it('게시글, 팀, 포지션, 멤버 정보를 조합해 게시글 상세 데이터를 생성하고 상태로 저장', async () => {
      const postId = 1;
      await postStore.fetchPost(postId);

      const { postInformation, postPositions } = postStore;

      const informationSize = Object.keys(postInformation).length;
      const positionsSize = Object.keys(postPositions).length;

      expect(informationSize).toBe(16);
      expect(positionsSize).toBe(2);
      expect(postPositions[0].roles.length).toBe(2);
      expect(postPositions[0].roles[0].members.length).toBe(1);
    });
  });
});

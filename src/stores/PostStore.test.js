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
    it('게시글, 팀, 포지션 정보를 조합해 게시글 리스트를 생성해 상태로 저장', async () => {
      await postStore.fetchPosts();

      const lengthPost = Object.keys(postStore.posts[0]).length;

      expect(lengthPost).toBe(17);

      const { posts } = postStore;

      expect(posts.length).toBe(2);
      expect(posts[0].positions.length).toBe(3);
      expect(posts[1].positions.length).toBe(1);
    });
  });
});

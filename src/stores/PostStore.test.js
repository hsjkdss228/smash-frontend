import context from 'jest-plugin-context';
import PostStore from './PostStore';

import { postApiService } from '../services/PostApiService';

describe('PostStore', () => {
  let postStore;

  beforeEach(() => {
    postStore = new PostStore();
  });

  context('API 서버에 게시글 리스트 데이터를 요청할 경우', () => {
    it('백엔드 서버에서 응답으로 전달된 post 리스트를 상태로 저장', async () => {
      postApiService.setAccessToken('userId 1');
      await postStore.fetchPosts();

      const { posts, postsErrorMessage } = postStore;

      expect(posts.length).toBe(2);
      expect(posts[0].hits).toBe(334);
      expect(posts[0].game.isRegistered).toBe(false);
      expect(posts[1].game.targetMemberCount).toBe(12);
      expect(posts[1].game.isRegistered).toBe(true);
      expect(postsErrorMessage).toBeFalsy();
    });
  });

  // 테스트 서버에서 백엔드에서 게임을 찾지 못해서 에러가 난 상황을 가정할 수가 있는가?
  // 약간 어거지기는 하지만 어떤 유저 아이디를 줬을 때에는
  // 그냥 무조건 에러가 난다고 가정하고 테스트를 진행해야 할 것 같다.

  context('API 서버에 게시글 리스트 데이터를 요청했는데 게시물의 경기 정보를 찾을 수 없는 경우', () => {
    it('백엔드 서버에서 응답으로 전달된 에러 메세지를 상태로 저장', async () => {
      postApiService.setAccessToken('userId 4');
      await postStore.fetchPosts();

      const { posts, postsErrorMessage } = postStore;

      expect(posts).toStrictEqual([]);
      expect(postsErrorMessage).toBe('주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.');
    });
  });

  context('API 서버에 게시글 상세 정보 데이터를 요청할 경우', () => {
    const postId = 1;

    it('백엔드 서버에서 응답으로 전달된 단일 post를 상태로 저장', async () => {
      postApiService.setAccessToken('userId 1');
      await postStore.fetchPost(postId);

      const { post, postErrorMessage } = postStore;

      expect(Object.keys(post).length).toBe(6);
      expect(post.authorPhoneNumber).toBe('010-1111-2222');
      expect(postErrorMessage).toBeFalsy();
    });
  });
});

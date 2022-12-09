/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];
    this.postsServerError = '';

    this.post = {};
    this.postServerError = '';
  }

  async fetchPosts() {
    try {
      const data = await postApiService.fetchPosts();
      this.posts = data.posts;
      this.publish();
    } catch (error) {
      this.postsServerError = error.response.data;
      this.publish();
    }
  }

  async fetchPost(postId) {
    try {
      const data = await postApiService.fetchPost(postId);
      this.post = data;
    } catch (error) {
      this.postServerError = error.response.data;
    }
  }

  // TODO: 게시글을 생성하는 POST 요청이 PostFormStore에서 여기로 옮겨와져야 함

  async deletePost(postId) {
    await postApiService.deletePost(postId);
  }
}

export const postStore = new PostStore();

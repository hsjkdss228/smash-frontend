/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];
    this.postsErrorMessage = '';
  }

  async fetchPosts() {
    try {
      const data = await postApiService.fetchPosts();
      this.posts = data.posts;
      this.publish();
    } catch (error) {
      const { errorMessage } = error.response.data;
      this.postsErrorMessage = errorMessage;
      this.publish();
    }
  }
}

export const postStore = new PostStore();

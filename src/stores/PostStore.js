/* eslint-disable class-methods-use-this */

import Store from './Store';

import { postApiService } from '../services/PostApiService';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];
  }

  async fetchPosts() {
    this.posts = await postApiService.fetchPosts();
    this.publish();
  }
}

export const postStore = new PostStore();

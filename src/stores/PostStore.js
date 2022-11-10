/* eslint-disable class-methods-use-this */

import { postApiService } from '../services/PostApiService';

export default class PostStore {
  constructor() {
    this.posts = [];

    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async fetchPosts() {
    this.posts = await postApiService.fetchPosts();
    this.publish();
  }
}

export const postStore = new PostStore();

/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class PostApiService {
  async fetchPosts() {
    const url = `${apiBaseUrl}/posts/list`;
    const { data } = await axios.get(url);
    return data.posts;
  }
}

export const postApiService = new PostApiService();

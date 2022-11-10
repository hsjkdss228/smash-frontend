/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class PostApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchPosts() {
    const url = `${apiBaseUrl}/posts`;
    const { data } = await axios.get(url);
    return data.posts;
  }

  // async fetchPost(postId) {
  //   const url = `${apiBaseUrl}/posts/${postId}`;
  //   const { data } = await axios.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken}`,
  //     },
  //   });
  //   // console.log(data);
  //   return data;
  // }
}

export const postApiService = new PostApiService();

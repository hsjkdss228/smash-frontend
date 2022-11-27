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
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async fetchPost(postId) {
    const url = `${apiBaseUrl}/posts/${postId}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async createPost({
    gameExercise,
    gameDate,
    gameStartTimeAmPm,
    gameStartHour,
    gameStartMinute,
    gameEndTimeAmPm,
    gameEndHour,
    gameEndMinute,
    gamePlace,
    gameTargetMemberCount,
    postDetail,
  }) {
    const url = `${apiBaseUrl}/posts`;
    const { data } = await axios.post(url, {
      gameExercise,
      gameDate,
      gameStartTimeAmPm,
      gameStartHour,
      gameStartMinute,
      gameEndTimeAmPm,
      gameEndHour,
      gameEndMinute,
      gamePlace,
      gameTargetMemberCount,
      postDetail,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async deletePost(postId) {
    const url = `${apiBaseUrl}/posts/${postId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export const postApiService = new PostApiService();

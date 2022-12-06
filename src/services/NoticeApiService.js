/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const { apiBaseUrl } = config;

export default class NoticeApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchNotices() {
    const url = `${apiBaseUrl}/notices`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async readNotice(noticeId) {
    const url = `${apiBaseUrl}/notices/${noticeId}`;
    await axios.patch(url);
  }
}

export const noticeApiService = new NoticeApiService();

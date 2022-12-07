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

  async fetchUnreadNoticeCount() {
    const url = `${apiBaseUrl}/notice-count`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: { status: 'unread' },
    });
    return data;
  }

  async readSelectedNotices({ selectedNoticeIds }) {
    const url = `${apiBaseUrl}/notices`;
    await axios.patch(url, { ids: selectedNoticeIds }, {
      params: { status: 'read' },
    });
  }

  async deleteSelectedNotices({ selectedNoticeIds }) {
    const url = `${apiBaseUrl}/notices`;
    await axios.patch(url, { ids: selectedNoticeIds }, {
      params: { status: 'deleted' },
    });
  }
}

export const noticeApiService = new NoticeApiService();

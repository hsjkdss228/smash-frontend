import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.notices = [];
    this.serverError = '';
  }

  async fetchNotices() {
    try {
      const data = await noticeApiService.fetchNotices();
      this.notices = data.notices;
      this.publish();
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
    }
  }
}

export const noticeStore = new NoticeStore();

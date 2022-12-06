import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.noticesDetailState = [];

    this.notices = [];
    this.serverError = '';
  }

  async fetchNotices() {
    try {
      const data = await noticeApiService.fetchNotices();
      this.notices = data.notices;
      this.noticesDetailState = Array(this.notices.length).fill(false);
      this.publish();
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
    }
  }

  async readNotice(targetIndex) {
    const notice = this.notices
      .find((_, index) => index === targetIndex);
    if (notice && notice.status === 'unread') {
      await noticeApiService.readNotice(notice.id);
    }
  }

  showNoticeDetail(targetIndex) {
    this.noticesDetailState = this.noticesDetailState
      .map((_, index) => index === targetIndex);
    this.publish();
  }
}

export const noticeStore = new NoticeStore();

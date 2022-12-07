import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.noticeStateToShow = 'all';
    this.noticesDetailState = [];

    this.notices = [];

    this.selectNoticeState = false;
    this.noticesSelectedState = [];

    this.unreadNoticeCount = 0;

    this.serverError = '';
  }

  async fetchNotices() {
    try {
      const data = await noticeApiService.fetchNotices();
      this.notices = data.notices;
      this.noticesDetailState = Array(this.notices.length).fill(false);
      this.clearNoticesSelectedState();
      this.publish();
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
    }
  }

  async readNotice(targetId) {
    const found = this.notices
      .find((notice) => notice.id === targetId);
    if (found && found.status === 'unread') {
      await noticeApiService.readNotice(found.id);
      await this.fetchUnreadNoticeCount();
    }
  }

  async showAll() {
    await this.fetchNotices();
    this.noticeStateToShow = 'all';
    this.selectNoticeState = false;
    this.clearNoticesSelectedState();
    this.publish();
  }

  async showUnreadOnly() {
    await this.fetchNotices();
    this.noticeStateToShow = 'unread';
    this.selectNoticeState = false;
    this.clearNoticesSelectedState();
    this.publish();
  }

  showNoticeDetail(targetIndex) {
    this.noticesDetailState = this.noticesDetailState
      .map((_, index) => index === targetIndex);
    this.publish();
  }

  closeNoticeDetail(targetIndex) {
    this.noticesDetailState[targetIndex] = false;
    this.publish();
  }

  toggleSelectNoticeState() {
    this.selectNoticeState = !this.selectNoticeState;
    if (!this.selectedNoticeState) {
      this.clearNoticesSelectedState();
    }
    this.publish();
  }

  selectNotice({ targetIndex, targetId }) {
    this.noticesSelectedState[targetIndex] = this.noticesSelectedState[targetIndex]
      ? ''
      : targetId;
  }

  clearNoticesSelectedState() {
    this.noticesSelectedState = Array(this.notices.length).fill('');
  }

  async fetchUnreadNoticeCount() {
    const data = await noticeApiService.fetchUnreadNoticeCount();
    this.unreadNoticeCount = data.count;
    this.publish();
  }
}

export const noticeStore = new NoticeStore();

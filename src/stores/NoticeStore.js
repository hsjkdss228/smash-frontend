import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.noticeStateToShow = 'all';
    this.noticesDetailState = [];

    this.noticesAll = [];
    this.noticesUnread = [];

    this.selectNoticeState = false;
    this.noticesSelectedState = [];

    this.unreadNoticeCount = 0;

    this.serverError = '';
  }

  async fetchNotices() {
    try {
      const data = await noticeApiService.fetchNotices();
      this.noticesAll = data.notices;
      this.noticesUnread = this.noticesAll
        .filter((notice) => notice.status === 'unread');

      this.initNoticesDetailState();
      this.initNoticesSelectedState();

      this.publish();
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
    }
  }

  initNoticesDetailState() {
    this.noticesDetailState = Array((
      this.noticeStateToShow === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill(false);
  }

  initNoticesSelectedState() {
    this.noticesSelectedState = Array((
      this.noticeStateToShow === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill('');
  }

  chooseArrayByStateToShow() {
    return this.noticeStateToShow === 'all'
      ? this.noticesAll
      : this.noticesUnread;
  }

  async showAll() {
    await this.fetchNotices();
    this.noticeStateToShow = 'all';
    this.selectNoticeState = false;
    this.initNoticesDetailState();
    this.initNoticesSelectedState();
    this.publish();
  }

  async showUnreadOnly() {
    await this.fetchNotices();
    this.noticeStateToShow = 'unread';
    this.selectNoticeState = false;
    this.initNoticesDetailState();
    this.initNoticesSelectedState();
    this.publish();
  }

  showNoticeDetail(targetIndex) {
    this.noticesDetailState = this.noticesDetailState
      .map((_, index) => index === targetIndex);
    this.publish();
  }

  async readNotice(targetId) {
    const notices = this.chooseArrayByStateToShow();

    const found = notices
      .find((notice) => notice.id === targetId);
    if (found && found.status === 'unread') {
      await noticeApiService.readNotice(found.id);
      await this.fetchUnreadNoticeCount();
    }
  }

  closeNoticeDetail(targetIndex) {
    this.noticesDetailState[targetIndex] = false;
    this.publish();
  }

  closeSelectNoticeState() {
    this.selectNoticeState = false;
  }

  toggleSelectNoticeState() {
    this.selectNoticeState = !this.selectNoticeState;
    if (!this.selectedNoticeState) {
      this.initNoticesSelectedState();
    }
    this.publish();
  }

  selectNotice({ targetIndex, targetId }) {
    this.noticesSelectedState[targetIndex] = this.noticesSelectedState[targetIndex]
      ? ''
      : targetId;
    this.publish();
  }

  selectAllNotices() {
    const notices = this.chooseArrayByStateToShow();
    this.noticesSelectedState = notices.map((notice) => notice.id);
    this.publish();
  }

  deselectAllNotices() {
    const notices = this.chooseArrayByStateToShow();
    this.noticesSelectedState = notices.map(() => '');
    this.publish();
  }

  async fetchUnreadNoticeCount() {
    const data = await noticeApiService.fetchUnreadNoticeCount();
    this.unreadNoticeCount = data.count;
    this.publish();
  }

  async readSelectedNotices() {
    const selectedNoticeIds = this.noticesSelectedState
      .filter((id) => id !== '');
    await noticeApiService
      .readSelectedNotices({ selectedNoticeIds });
  }

  async deleteSelectedNotices() {
    const selectedNoticeIds = this.noticesSelectedState
      .filter((id) => id !== '');
    await noticeApiService
      .deleteSelectedNotices({ selectedNoticeIds });
  }
}

export const noticeStore = new NoticeStore();

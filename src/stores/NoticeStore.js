import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.showAllNoticesMode = true;
    this.showUnreadNoticesMode = false;

    this.noticeStateToShown = 'all';

    this.isOpenedNotice = [];

    this.noticesAll = [];
    this.noticesUnread = [];

    this.selectNoticeMode = false;
    this.selectedNotices = [];

    this.unreadNoticeCount = 0;

    this.serverError = '';
  }

  initNoticesDetailState() {
    this.isOpenedNotice = Array((
      this.noticeStateToShown === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill(false);
  }

  initSelectedNotices() {
    this.selectedNotices = Array((
      this.noticeStateToShown === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill('');
  }

  toggleSelectNoticeMode() {
    this.selectNoticeMode = !this.selectNoticeMode;
    if (!this.selectedNoticeMode) {
      this.initSelectedNotices();
    }
    this.publish();
  }

  async showAll() {
    this.showAllNoticesMode = true;
    this.showUnreadNoticesMode = false;
    await this.fetchNotices();
    this.noticeStateToShown = 'all';
    this.initNoticesDetailState();
    this.initSelectedNotices();
    this.publish();
  }

  async showUnreadOnly() {
    this.showAllNoticesMode = false;
    this.showUnreadNoticesMode = true;
    await this.fetchNotices();
    this.noticeStateToShown = 'unread';
    this.initNoticesDetailState();
    this.initSelectedNotices();
    this.publish();
  }

  async fetchNotices() {
    try {
      const data = await noticeApiService.fetchNotices();
      this.noticesAll = data.notices;
      this.noticesUnread = this.noticesAll
        .filter((notice) => notice.status === 'unread');

      this.initNoticesDetailState();
      this.initSelectedNotices();

      this.publish();
    } catch (error) {
      this.serverError = error.response.data;
      this.publish();
    }
  }

  selectAllNotices() {
    const notices = this.chooseArrayByStateToShow();
    this.selectedNotices = notices.map((notice) => notice.id);
    this.publish();
  }

  deselectAllNotices() {
    const notices = this.chooseArrayByStateToShow();
    this.selectedNotices = notices.map(() => '');
    this.publish();
  }

  chooseArrayByStateToShow() {
    return this.noticeStateToShown === 'all'
      ? this.noticesAll
      : this.noticesUnread;
  }

  showNoticeDetail(targetIndex) {
    this.isOpenedNotice = this.isOpenedNotice
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
    this.isOpenedNotice[targetIndex] = false;
    this.publish();
  }

  closeSelectNoticeMode() {
    this.selectNoticeMode = false;
  }

  selectNotice({ targetIndex, targetId }) {
    this.selectedNotices[targetIndex] = this.selectedNotices[targetIndex]
      ? ''
      : targetId;
    this.publish();
  }

  async fetchUnreadNoticeCount() {
    const data = await noticeApiService.fetchUnreadNoticeCount();
    this.unreadNoticeCount = data.count;
    this.publish();
  }

  async readSelectedNotices() {
    const selectedNoticeIds = this.selectedNotices
      .filter((id) => id !== '');
    await noticeApiService
      .readSelectedNotices({ selectedNoticeIds });
    await this.fetchNotices();
  }

  async deleteSelectedNotices() {
    const selectedNoticeIds = this.selectedNotices
      .filter((id) => id !== '');
    await noticeApiService
      .deleteSelectedNotices({ selectedNoticeIds });
    await this.fetchNotices();
  }
}

export const noticeStore = new NoticeStore();

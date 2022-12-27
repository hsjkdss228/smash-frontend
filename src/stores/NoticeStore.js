import { noticeApiService } from '../services/NoticeApiService';
import Store from './Store';

export default class NoticeStore extends Store {
  constructor() {
    super();

    this.noticeStateToShow = 'all';

    this.isOpenedNotice = [];

    this.noticesAll = [];
    this.noticesUnread = [];

    this.selectNoticeMode = false;
    this.selectedNotices = [];

    this.unreadNoticeCount = 0;

    this.serverError = '';
  }

  closeSelectNoticeMode() {
    this.selectNoticeMode = false;
  }

  initNoticesDetailState() {
    this.isOpenedNotice = Array((
      this.noticeStateToShow === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill(false);
  }

  initSelectedNotices() {
    this.selectedNotices = Array((
      this.noticeStateToShow === 'all'
        ? this.noticesAll.length
        : this.noticesUnread.length
    )).fill('');
  }

  toggleSelectNoticeMode() {
    this.selectNoticeMode = !this.selectNoticeMode;
    if (!this.selectNoticeMode) {
      this.initSelectedNotices();
    }
    this.publish();
  }

  async showAll() {
    this.noticeStateToShow = 'all';
    await this.fetchNotices();
    this.publish();
  }

  async showUnreadOnly() {
    this.noticeStateToShow = 'unread';
    await this.fetchNotices();
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

  chooseArrayForSelectionByStateToShow() {
    return this.noticeStateToShow === 'all'
      ? this.noticesAll
      : this.noticesUnread;
  }

  selectAllNotices() {
    const notices = this.chooseArrayForSelectionByStateToShow();
    this.selectedNotices = notices.map((notice) => notice.id);
    this.publish();
  }

  deselectAllNotices() {
    const notices = this.chooseArrayForSelectionByStateToShow();
    this.selectedNotices = notices.map(() => '');
    this.publish();
  }

  selectNotice({ targetIndex, targetId }) {
    this.selectedNotices[targetIndex] = this.selectedNotices[targetIndex]
      ? ''
      : targetId;
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

  async fetchUnreadNoticeCount() {
    const data = await noticeApiService.fetchUnreadNoticeCount();
    this.unreadNoticeCount = data.count;
    this.publish();
  }

  showNoticeDetail(targetIndex) {
    this.isOpenedNotice = this.isOpenedNotice
      .map((_, index) => index === targetIndex);
    this.publish();
  }

  async readNotice(targetId) {
    const notices = this.chooseArrayForSelectionByStateToShow();

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
}

export const noticeStore = new NoticeStore();

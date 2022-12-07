/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useNoticeStore from '../hooks/useNoticeStore';

import Notices from '../components/Notices';

export default function NoticesPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const navigateBackward = () => {
    navigate(previousPath || '/');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const noticeStore = useNoticeStore();

  useEffect(() => {
    if (!loggedIn) {
      navigateLogin();
    }
    noticeStore.fetchNotices();
  }, [accessToken]);

  const {
    noticesAll,
    noticesUnread,
    noticeStateToShow,
    noticesDetailState,
    selectNoticeState,
    noticesSelectedState,
  } = noticeStore;

  const notices = noticeStateToShow === 'all'
    ? noticesAll
    : noticesUnread;

  const showAll = async () => {
    await noticeStore.showAll();
  };

  const showUnreadOnly = async () => {
    await noticeStore.showUnreadOnly();
  };

  const showNoticeDetail = async ({ targetIndex, targetId }) => {
    await noticeStore.showNoticeDetail(targetIndex);
    await noticeStore.readNotice(targetId);
  };

  const closeNoticeDetail = (targetIndex) => {
    noticeStore.closeNoticeDetail(targetIndex);
  };

  const toggleSelectNoticeState = () => {
    noticeStore.toggleSelectNoticeState();
  };

  const selectNotice = ({ targetIndex, targetId }) => {
    noticeStore.selectNotice({ targetIndex, targetId });
  };

  const selectAllNotices = () => {
    noticeStore.selectAllNotices();
  };

  const deselectAllNotices = () => {
    noticeStore.deselectAllNotices();
  };

  return (
    <Notices
      navigateBackward={navigateBackward}
      notices={notices}
      noticeStateToShow={noticeStateToShow}
      showAll={showAll}
      showUnreadOnly={showUnreadOnly}
      noticesDetailState={noticesDetailState}
      showNoticeDetail={showNoticeDetail}
      closeNoticeDetail={closeNoticeDetail}
      selectNoticeState={selectNoticeState}
      toggleSelectNoticeState={toggleSelectNoticeState}
      noticesSelectedState={noticesSelectedState}
      selectNotice={selectNotice}
      selectAllNotices={selectAllNotices}
      deselectAllNotices={deselectAllNotices}
    />
  );
}

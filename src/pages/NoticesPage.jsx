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
    notices,
    noticeStateToShow,
    noticesDetailState,
  } = noticeStore;

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
    />
  );
}

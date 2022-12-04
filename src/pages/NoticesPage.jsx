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

  const { notices } = noticeStore;

  return (
    <Notices
      notices={notices}
      navigateBackward={navigateBackward}
    />
  );
}

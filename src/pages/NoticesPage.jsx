/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useNoticeStore from '../hooks/useNoticeStore';

import Notices from '../components/Notices';

export default function NoticesPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const navigate = useNavigate();

  const navigateBackward = () => {
    navigate(-1);
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

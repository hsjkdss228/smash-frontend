/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import Notices from '../components/notices/Notices';

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

  useEffect(() => {
    if (!loggedIn) {
      navigateLogin();
    }
  }, []);

  return (
    <Notices
      navigateBackward={navigateBackward}
    />
  );
}

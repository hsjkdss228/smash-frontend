import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';
import useNoticeStore from '../hooks/useNoticeStore';

import { userApiService } from '../services/UserApiService';
import { noticeApiService } from '../services/NoticeApiService';

const Container = styled.header`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 4fr;
  gap: 50%;
  border-bottom: 1px solid black;
  background-color: #FFF;
`;

const Title = styled.h1`
  font-size: 1.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Side = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const UnreadNoticeCount = styled.span`
  font-size: .5em;
  color: #f00;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();
  const navigate = useNavigate();

  const userStore = useUserStore();
  const noticeStore = useNoticeStore();

  const { unreadNoticeCount } = noticeStore;
  const { name } = userStore;

  useEffect(() => {
    if (accessToken) {
      userApiService.setAccessToken(accessToken);
      noticeApiService.setAccessToken(accessToken);
      userStore.fetchUserName();
      noticeStore.fetchUnreadNoticeCount();
    }
  }, [accessToken]);

  const navigateNoticesPage = () => {
    navigate('/notices', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const navigateLogin = () => {
    navigate('/login', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  const navigateSelectTrialAccount = () => {
    navigate('/trial-account', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  return (
    <Container>
      <Title>SMASH</Title>
      <Side>
        {accessToken ? (
          <>
            <p>
              {name}
              {' '}
              님
            </p>
            <button
              type="button"
              onClick={navigateNoticesPage}
            >
              알림
              {(unreadNoticeCount >= 1) && (
                <UnreadNoticeCount>
                  (
                  {unreadNoticeCount}
                  )
                </UnreadNoticeCount>
              )}
            </button>
            <button
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={navigateLogin}
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={navigateSelectTrialAccount}
            >
              체험용 계정 선택
            </button>
          </>
        )}
      </Side>
    </Container>
  );
}

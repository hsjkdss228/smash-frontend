import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';
import useNoticeStore from '../hooks/useNoticeStore';

import { userApiService } from '../services/UserApiService';
import { noticeApiService } from '../services/NoticeApiService';

import colorLogo from './assets/images/ColorLogo.png';
import Logo from './ui/HeaderLogo';

const Container = styled.header`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 4fr 6fr;
  gap: 50%;
  border-bottom: 1px solid black;
  background-color: #000;
  color: #FF7A63;
`;

const Side = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const SelectTrialButton = styled.button`
  color: #fff;
`;

const NoticeButton = styled.button`
  color: #fff;
`;

const MyPageButton = styled.button`
  color: #fff;
`;

const LoginLogoutButton = styled.button`
  padding: .7em 1.2em;
  border-radius: 2em;
  background-color: #FF7A63;
  color: #000;
`;

const UnreadNoticeCount = styled.span`
  font-size: 1em;
  font-weight: bold;
  color: #f00;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();
  const navigate = useNavigate();

  const userStore = useUserStore();
  const noticeStore = useNoticeStore();

  useEffect(() => {
    if (accessToken) {
      userApiService.setAccessToken(accessToken);
      noticeApiService.setAccessToken(accessToken);
      userStore.fetchUserName();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      noticeStore.fetchUnreadNoticeCount();
    }
  }, [accessToken, noticeStore.unreadNoticeCount]);

  const { name } = userStore;
  const { unreadNoticeCount } = noticeStore;

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

  const navigateMain = () => {
    navigate('/', {
      state: {
        previousPath: location.pathname,
      },
    });
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
      <button
        type="button"
        onClick={navigateMain}
      >
        <Logo
          logoUrl={colorLogo}
        >
          SMASH
        </Logo>
      </button>
      <Side>
        {accessToken ? (
          <>
            <p>
              {name}
              {' '}
              님
            </p>
            <NoticeButton
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
            </NoticeButton>
            <MyPageButton
              type="button"
            >
              마이페이지
            </MyPageButton>
            <LoginLogoutButton
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </LoginLogoutButton>
          </>
        ) : (
          <>
            <SelectTrialButton
              type="button"
              onClick={navigateSelectTrialAccount}
            >
              체험용 계정 선택
            </SelectTrialButton>
            <LoginLogoutButton
              type="button"
              onClick={navigateLogin}
            >
              로그인
            </LoginLogoutButton>
          </>
        )}
      </Side>
    </Container>
  );
}

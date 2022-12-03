import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import { userApiService } from '../services/UserApiService';

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

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    if (accessToken) {
      userApiService.setAccessToken(accessToken);
      userStore.fetchUserName();
    }
  }, [accessToken]);

  const { name } = userStore;

  const navigateNoticesPage = () => {
    navigate('/notices');
  };

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const navigateLoginPage = () => {
    navigate('/login');
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
            </button>
            <button
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={navigateLoginPage}
          >
            LOGIN
          </button>
        )}
      </Side>
    </Container>
  );
}

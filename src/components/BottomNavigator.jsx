import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ModalLoginGuide from './ModalLoginGuide';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 1px solid #000;
  background-color: #FFF;
`;

export default function BottomNavigator() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();
  const navigate = useNavigate();

  const [loginGuideModalState, setLoginGuideModalState] = useState(false);

  const navigateHome = () => {
    navigate('/');
  };

  const navigatePage = (link) => {
    if (accessToken) {
      navigate(link, {
        state: {
          previousPath: location.pathname,
        },
      });
      return;
    }

    setLoginGuideModalState(true);
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
    <>
      <Container>
        <button
          type="button"
          onClick={navigateHome}
        >
          홈
        </button>
        <button
          type="button"
          onClick={() => navigatePage('/write')}
        >
          글쓰기
        </button>
        <button
          type="button"
          onClick={() => navigatePage('/chat')}
        >
          채팅
        </button>
      </Container>
      <ModalLoginGuide
        loginGuideModalState={loginGuideModalState}
        setLoginGuideModalState={setLoginGuideModalState}
        onClickLogin={navigateLogin}
        onClickSelectTrialAccount={navigateSelectTrialAccount}
      />
    </>
  );
}

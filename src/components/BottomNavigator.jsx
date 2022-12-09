import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ModalLoginGuide from './ModalLoginGuide';

import homeButton from './assets/images/Home.png';
import writeButton from './assets/images/Write.png';
import chatButton from './assets/images/Chat.png';
import homeButtonSelected from './assets/images/HomeSelected.png';
import writeButtonSelected from './assets/images/WriteSelected.png';
import chatButtonSelected from './assets/images/ChatSelected.png';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: calc(100% - (100% - 600px));
  display: grid;
  align-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  margin-inline: calc((100% - 600px) / 2);
  background-color: #000;
`;

const BottomNavigatorButton = styled.button`
  height: 2em;
  color: transparent;
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
        <BottomNavigatorButton
          type="button"
          url={location.pathname.includes('/posts') ? homeButtonSelected : homeButton}
          onClick={navigateHome}
        >
          홈
        </BottomNavigatorButton>
        <BottomNavigatorButton
          type="button"
          url={location.pathname.includes('/write') ? writeButtonSelected : writeButton}
          onClick={() => navigatePage('/write')}
        >
          글쓰기
        </BottomNavigatorButton>
        <BottomNavigatorButton
          type="button"
          url={location.pathname.includes('/chat') ? chatButtonSelected : chatButton}
          onClick={() => navigatePage('/chat')}
        >
          채팅
        </BottomNavigatorButton>
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

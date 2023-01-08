import { Navigate, Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import { postApiService } from './services/PostApiService';
import { gameApiService } from './services/GameApiService';
import { registerApiService } from './services/RegisterApiService';
import { noticeApiService } from './services/NoticeApiService';
import { userApiService } from './services/UserApiService';

import Header from './components/header/Header';
import PostsPage from './pages/PostsPage';
import PostListMapPage from './pages/PostListMapPage';
import PostPage from './pages/PostPage';
import PostFormPage from './pages/PostFormPage';
import BottomNavigator from './components/bottom-navigator/BottomNavigator';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';
import NoticesPage from './pages/NoticesPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';

const Container = styled.div`
  height: 100vh;
  padding: 60px calc((100% - 650px) / 2);
  background-color: #D3D2D9;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #E1E1E1;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    postApiService.setAccessToken(accessToken);
    gameApiService.setAccessToken(accessToken);
    registerApiService.setAccessToken(accessToken);
    noticeApiService.setAccessToken(accessToken);
    userApiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header />
      <Container>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/posts/list" />} />
            <Route path="/posts/list" element={<PostsPage />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/write" element={<PostFormPage />} />
            <Route path="/notices" element={<NoticesPage />} />

            <Route path="/posts/map" element={<PostListMapPage />} />
          </Routes>
        </Wrapper>
      </Container>
      <BottomNavigator />
    </>
  );
}

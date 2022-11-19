import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { postApiService } from './services/PostApiService';
import { registerApiService } from './services/RegisterApiService';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import PostListMapPage from './pages/PostListMapPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import CreateClubPage from './pages/CreateClubPage';
import ClubsPage from './pages/ClubsPage';
import BottomNavigator from './components/BottomNavigator';

const Container = styled.div`
  max-width: 768px;
  min-height: 1024px;
`;

const Wrapper = styled.div`
  margin: 4em auto;
  height: 100%;
  width: 100%;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    postApiService.setAccessToken(accessToken);
    registerApiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <Container>
      <Reset />
      <Header />
      <BottomNavigator />
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/list" element={<PostsPage />} />
          <Route path="/posts/:postId" element={<PostPage />} />

          <Route path="/posts/map" element={<PostListMapPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/create" element={<CreateClubPage />} />
        </Routes>
      </Wrapper>
    </Container>
  );
}

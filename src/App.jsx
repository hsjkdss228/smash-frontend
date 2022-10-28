import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import { Reset } from 'styled-reset';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PostsListPage from './pages/PostsListPage';
import PostsMapPage from './pages/PostsMapPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import CreateClubPage from './pages/CreateClubPage';
import ClubsPage from './pages/ClubsPage';

const Container = styled.div`
  max-width: 768px;
  min-height: 1024px;
`;

export default function App() {
  return (
    <Container>
      <Reset />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* TODO: ExerciseListPage는 파라미터의 전달이 많이 이루어져야 한다. 어떻게 구분할 것인가? */}
        <Route path="/posts/list" element={<PostsListPage />} />

        <Route path="/posts/map" element={<PostsMapPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/create" element={<CreateClubPage />} />
      </Routes>
    </Container>
  );
}

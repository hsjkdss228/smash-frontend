import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostInformation from '../components/PostInformation';
import PostPositions from '../components/PostPositions';
import usePostStore from '../hooks/usePostStore';

const Container = styled.article`
  
`;

export default function PostPage() {
  const location = useLocation();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const postStore = usePostStore();

  // TODO: id를 넘겨줘야 함

  useEffect(() => {
    postStore.fetchPost(postId);
  }, []);

  const { information, teamsAndPositions } = postStore;

  return (
    <Container>
      <PostInformation
        information={information}
      />
      <PostPositions
        teamsAndPositions={teamsAndPositions}
      />
    </Container>
  );
}

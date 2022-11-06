import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { useEffect } from 'react';

import usePostStore from '../hooks/usePostStore';

import PostInformation from '../components/PostInformation';
import PostPositions from '../components/PostPositions';

const Container = styled.article`
  
`;

export default function PostPage() {
  const location = useLocation();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPost(postId);
  }, []);

  const { postInformation, postPositions } = postStore;

  return (
    <Container>
      {postInformation && postPositions ? (
        <>
          <PostInformation
            information={postInformation}
          />
          <PostPositions
            teamsAndPositions={postPositions}
          />
        </>
      ) : (
        <p>Now Loading...</p>
      )}
    </Container>
  );
}

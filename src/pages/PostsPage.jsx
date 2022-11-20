import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../hooks/usePostStore';
import useRegisterStore from '../hooks/useRegisterStore';

import Posts from '../components/Posts';

export default function PostsPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const postStore = usePostStore();
  const registerStore = useRegisterStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, [accessToken]);

  const { posts, postsErrorMessage } = postStore;

  const navigateToBackward = () => {
    navigate(-1);
  };

  const navigateToPost = (postId) => {
    navigate(`/posts/${postId}`, {
      state: {
        postId,
      },
    });
  };

  const registerToGame = async (gameId) => {
    const applicationId = await registerStore.registerToGame(gameId);
    if (applicationId) {
      await postStore.fetchPosts();
    }
  };

  const cancelRegisterToGame = async (registerId) => {
    await registerStore.cancelRegisterToGame(registerId);
    await postStore.fetchPosts();
  };

  const cancelParticipateToGame = async (registerId) => {
    await registerStore.cancelParticipateToGame(registerId);
    await postStore.fetchPosts();
  };

  const { registerErrorCodeAndMessage } = registerStore;

  return (
    <Posts
      posts={posts}
      navigateToBackward={navigateToBackward}
      navigateToPost={navigateToPost}
      registerToGame={registerToGame}
      cancelRegisterToGame={cancelRegisterToGame}
      cancelParticipateToGame={cancelParticipateToGame}
      postsErrorMessage={postsErrorMessage}
      registerErrorCodeAndMessage={registerErrorCodeAndMessage}
    />
  );
}

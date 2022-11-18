import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../hooks/usePostStore';
import useRegisterStore from '../hooks/useRegisterStore';
import useMemberStore from '../hooks/useMemberStore';

import Posts from '../components/Posts';

export default function PostsPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const postStore = usePostStore();
  const registerStore = useRegisterStore();
  const memberStore = useMemberStore();

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
    const registeredGameId = await registerStore.registerToGame(gameId);
    if (registeredGameId) {
      await postStore.fetchPosts();
    }
  };

  const cancelRegisterGame = async (gameId) => {
    await memberStore.cancelParticipateGame(gameId);
    await postStore.fetchPosts();
  };

  const { registerErrorCodeAndMessage } = registerStore;

  return (
    <Posts
      posts={posts}
      navigateToPost={navigateToPost}
      navigateToBackward={navigateToBackward}
      postsErrorMessage={postsErrorMessage}
      registerErrorCodeAndMessage={registerErrorCodeAndMessage}
      registerToGame={registerToGame}
      cancelRegisterGame={cancelRegisterGame}
    />
  );
}

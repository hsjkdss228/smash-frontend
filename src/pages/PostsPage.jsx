import { useEffect } from 'react';
import Posts from '../components/Posts';
import usePostStore from '../hooks/usePostStore';
import useRegisterStore from '../hooks/useRegisterStore';
import useMemberStore from '../hooks/useMemberStore';

export default function PostsPage() {
  const postStore = usePostStore();
  const registerStore = useRegisterStore();
  const memberStore = useMemberStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts, postsErrorMessage } = postStore;

  // TODO: 게시글 클릭 시 게시글 상세 페이지로 링크 연결

  const registerToGame = async (gameId) => {
    const registeredGameId = await registerStore.registerToGame(gameId);
    if (registeredGameId) {
      await postStore.fetchPosts();
    }
  };

  const { registeredGameId, registerErrorCodeAndMessage } = registerStore;

  const cancelRegisterGame = async (gameId) => {
    await memberStore.cancelParticipateGame(gameId);
    await postStore.fetchPosts();
  };

  return (
    <Posts
      posts={posts}
      postsErrorMessage={postsErrorMessage}
      registerToGame={registerToGame}
      cancelRegisterGame={cancelRegisterGame}
    />
  );
}

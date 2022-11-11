import { useEffect } from 'react';
import Posts from '../components/Posts';
import usePostStore from '../hooks/usePostStore';
import useRegisterStore from '../hooks/useRegisterStore';

export default function PostsPage() {
  const postStore = usePostStore();
  const registerStore = useRegisterStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  // TODO: 게시글 클릭 시 게시글 상세 페이지로 링크 연결

  const registerToGame = async (gameId) => {
    console.log('gameId in PostsPage: ', gameId);

    const registeredGameId = await registerStore.registerToGame(gameId);

    if (registeredGameId) {
      await postStore.fetchPosts();
    }
  };

  return (
    <Posts
      posts={posts}
      registerToGame={registerToGame}
    />
  );
}

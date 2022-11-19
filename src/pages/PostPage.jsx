import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Post from '../components/Post';
import usePostStore from '../hooks/usePostStore';
import useGameStore from '../hooks/useGameStore';
import useRegisterStore from '../hooks/useRegisterStore';

export default function PostPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const postStore = usePostStore();
  const gameStore = useGameStore();
  const registerStore = useRegisterStore();

  const fetchData = async () => {
    await postStore.fetchPost(postId);
    const gameId = await gameStore.fetchGame(postId);
    if (gameId) {
      await registerStore.fetchMembers(gameId);
    }
  };

  useEffect(() => {
    fetchData(postId);
  }, [accessToken]);

  const { post } = postStore;
  const { game } = gameStore;
  const { members } = registerStore;

  const navigateToBackward = () => {
    navigate(-1);
  };

  return (
    <Post
      navigateToBackward={navigateToBackward}
      post={post}
      game={game}
      members={members}
    />
  );
}

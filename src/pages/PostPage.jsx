import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Post from '../components/Post';
import usePostStore from '../hooks/usePostStore';
import useGameStore from '../hooks/useGameStore';
import useMemberStore from '../hooks/useMemberStore';

export default function PostPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const postStore = usePostStore();
  const gameStore = useGameStore();
  const memberStore = useMemberStore();

  useEffect(() => {
    postStore.fetchPost(postId);
    const gameId = gameStore.fetchGame(postId);
    if (gameId) {
      memberStore.fetchMembers(gameId);
    }
  }, [accessToken]);

  const { post } = postStore;
  const { game } = gameStore;
  const { members } = memberStore;

  return (
    <Post
      post={post}
      game={game}
      members={members}
    />
  );
}

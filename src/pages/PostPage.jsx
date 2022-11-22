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
    const { isAuthor } = postStore.post;
    if (gameId && !isAuthor) {
      await registerStore.fetchMembers(gameId);
    }
    if (gameId && isAuthor) {
      await registerStore.fetchMembers(gameId);
      await registerStore.fetchApplicants(gameId);
    }
  };

  useEffect(() => {
    fetchData(postId);
  }, [accessToken]);

  const { post } = postStore;
  const { game } = gameStore;
  const { members, applicants } = registerStore;

  const navigateToBackward = () => {
    navigate(-1);
  };

  const handleClickRegister = async (gameId) => {
    const applicationId = await registerStore.registerToGame(gameId);
    if (applicationId) {
      await fetchData(postId);
    }
  };

  const handleClickRegisterCancel = async (registerId) => {
    await registerStore.cancelRegisterToGame(registerId);
    await fetchData(postId);
  };

  const handleClickParticipateCancel = async (registerId) => {
    await registerStore.cancelParticipateToGame(registerId);
    await fetchData(postId);
  };

  const acceptRegister = async (registerId) => {
    await registerStore.acceptRegister(registerId);
    await fetchData(postId);
  };

  const rejectRegister = async (registerId) => {
    await registerStore.rejectRegister(registerId);
    await fetchData(postId);
  };

  return (
    <Post
      navigateToBackward={navigateToBackward}
      post={post}
      game={game}
      members={members}
      applicants={applicants}
      handleClickRegister={handleClickRegister}
      handleClickRegisterCancel={handleClickRegisterCancel}
      handleClickParticipateCancel={handleClickParticipateCancel}
      acceptRegister={acceptRegister}
      rejectRegister={rejectRegister}
    />
  );
}

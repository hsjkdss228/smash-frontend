import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Post from '../components/Post';
import usePostStore from '../hooks/usePostStore';
import useGameStore from '../hooks/useGameStore';
import useRegisterStore from '../hooks/useRegisterStore';

export default function PostPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

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
  const {
    members,
    applicants,
    registerErrorCodeAndMessage,
  } = registerStore;

  const navigateToBackward = () => {
    navigate(-1);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  // TODO: 체험 계정 선택하기 페이지로 이동시키기

  const navigateToSelectTrialAccount = () => {
    navigate('/login');
  };

  const handleClickDeletePost = async (targetPostId) => {
    await postStore.deletePost(targetPostId);
    navigate('/posts/list');
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
      loggedIn={loggedIn}
      navigateToBackward={navigateToBackward}
      navigateToLogin={navigateToLogin}
      navigateToSelectTrialAccount={navigateToSelectTrialAccount}
      post={post}
      game={game}
      members={members}
      applicants={applicants}
      handleClickDeletePost={handleClickDeletePost}
      handleClickRegister={handleClickRegister}
      handleClickRegisterCancel={handleClickRegisterCancel}
      handleClickParticipateCancel={handleClickParticipateCancel}
      acceptRegister={acceptRegister}
      rejectRegister={rejectRegister}
      registerError={registerErrorCodeAndMessage}
    />
  );
}

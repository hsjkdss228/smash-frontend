/* eslint-disable no-nested-ternary */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Post from '../components/Post';
import usePostStore from '../hooks/usePostStore';
import useGameStore from '../hooks/useGameStore';
import useRegisterStore from '../hooks/useRegisterStore';
import ModalConfirm from '../components/ModalConfirm';
import ModalReconfirm from '../components/ModalReconfirm';

export default function PostPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const [registerId, setRegisterId] = useState(0);
  const [postIdToBeDeleted, setPostIdToBeDeleted] = useState(0);
  const [actionName, setActionName] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

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

  const navigateBackward = () => {
    navigate('/posts/list');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  // TODO: 체험 계정 선택하기 페이지로 이동시키기

  const navigateToSelectTrialAccount = () => {
    navigate('/login');
  };

  const seeConfirmModal = ({ message }) => {
    setActionMessage(message);
    setConfirmModalState(true);
  };

  const seeReconfirmModal = ({ action, message }) => {
    setActionName(action);
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const hideReconfirmModal = () => {
    setActionName('');
    setReconfirmModalState(false);
  };

  const reconfirmDeletePost = (targetPostId) => {
    setPostIdToBeDeleted(targetPostId);
    seeReconfirmModal({ action: 'deletePost', message: '게시글을 삭제' });
  };

  const deletePost = async () => {
    await postStore.deletePost(postIdToBeDeleted);
    navigate('/posts/list', {
      state: {
        postStatus: 'deleted',
      },
    });
  };

  const handleClickRegister = async (gameId) => {
    const applicationId = await registerStore.registerToGame(gameId);
    if (applicationId) {
      await fetchData(postId);
      seeConfirmModal({ message: '참가 신청이' });
    }
  };

  const reconfirmRegisterCancel = (targetRegisterId) => {
    setRegisterId(targetRegisterId);
    seeReconfirmModal({ action: 'registerCancel', message: '참가 신청을 취소' });
  };

  const reconfirmParticipateCancel = (targetRegisterId) => {
    setRegisterId(targetRegisterId);
    seeReconfirmModal({ action: 'participateCancel', message: '참가를 취소' });
  };

  const reconfirmRegisterReject = (targetRegisterId) => {
    setRegisterId(targetRegisterId);
    seeReconfirmModal({ action: 'registerReject', message: '참가 신청을 거절' });
  };

  const cancelRegister = async () => {
    await registerStore.cancelRegisterToGame(registerId);
    await fetchData(postId);
    hideReconfirmModal();
    seeConfirmModal({ message: '참가 신청 취소가' });
  };

  const cancelParticipate = async () => {
    await registerStore.cancelParticipateToGame(registerId);
    await fetchData(postId);
    hideReconfirmModal();
    seeConfirmModal({ message: '참가 취소가' });
  };

  const handleClickAcceptRegister = async (targetRegisterId) => {
    await registerStore.acceptRegister(targetRegisterId);
    await fetchData(postId);
    seeConfirmModal({ message: '참가 신청 수락이' });
  };

  const rejectRegister = async () => {
    await registerStore.rejectRegister(registerId);
    await fetchData(postId);
    hideReconfirmModal();
    seeConfirmModal({ message: '참가 신청 거절이' });
  };

  return (
    <>
      <Post
        loggedIn={loggedIn}
        navigateBackward={navigateBackward}
        navigateToLogin={navigateToLogin}
        navigateToSelectTrialAccount={navigateToSelectTrialAccount}
        post={post}
        game={game}
        members={members}
        applicants={applicants}
        reconfirmDeletePost={reconfirmDeletePost}
        handleClickRegister={handleClickRegister}
        reconfirmRegisterCancel={reconfirmRegisterCancel}
        reconfirmParticipateCancel={reconfirmParticipateCancel}
        handleClickAcceptRegister={handleClickAcceptRegister}
        reconfirmRegisterReject={reconfirmRegisterReject}
        registerError={registerErrorCodeAndMessage}
      />
      {confirmModalState && (
        <ModalConfirm
          actionMessage={actionMessage}
          confirmModalState={confirmModalState}
          setConfirmModalState={setConfirmModalState}
        />
      )}
      {reconfirmModalState && (
        <ModalReconfirm
          action={(
            actionName === 'registerCancel' ? cancelRegister
              : actionName === 'participateCancel' ? cancelParticipate
                : actionName === 'registerReject' ? rejectRegister
                  : actionName === 'deletePost' ? deletePost
                    : null
          )}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>

  );
}

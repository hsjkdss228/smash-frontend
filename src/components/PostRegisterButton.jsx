/* eslint-disable no-nested-ternary */

import { useState } from 'react';

import styled from 'styled-components';

import useGameStore from '../hooks/useGameStore';
import useRegisterStore from '../hooks/useRegisterStore';

import ModalConfirm from './ModalConfirm';
import ModalReconfirm from './ModalReconfirm';

const RegisterButton = styled.button`
  font-size: 1em;
  width: 100%;
  font-weight: bold;
  color: #FF7A63;
  padding: 1.25em;
  border: 1px solid #CCC;
  border-radius: 5px;
  background-color: #fff;

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }

  :disabled {
    color: #fff;
    border-color: transparent;
    background-color: #A3A3A3;
    cursor: default;
  }
`;

export default function PostRegisterButton({
  fetchData,
}) {
  const [actionName, setActionName] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [registerId, setRegisterId] = useState(0);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

  const gameStore = useGameStore();
  const registerStore = useRegisterStore();

  const { game } = gameStore;
  const {
    registerServerError,
    changeRegisterServerError,
  } = registerStore;

  const seeConfirmModal = ({ message }) => {
    setActionMessage(message);
    setConfirmModalState(true);
  };

  const handleClickRegister = async () => {
    const applicationId = await registerStore.registerGame(game.id);
    if (applicationId) {
      await fetchData();
      seeConfirmModal({ message: '참가 신청이' });
    }
  };

  const cancelRegisterGame = async () => {
    await registerStore.cancelRegisterGame(registerId);
    await fetchData();
    seeConfirmModal({ message: '참가 신청 취소가' });
  };

  const cancelParticipateGame = async () => {
    await registerStore.cancelParticipateGame(registerId);
    await fetchData();
    seeConfirmModal({ message: '참가 취소가' });
  };

  const seeReconfirmModal = ({ action, message }) => {
    setActionName(action);
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmRegisterCancel = (targetRegisterId) => {
    setRegisterId(targetRegisterId);
    seeReconfirmModal({ action: 'registerCancel', message: '참가 신청을 취소' });
  };

  const reconfirmParticipateCancel = (targetRegisterId) => {
    setRegisterId(targetRegisterId);
    seeReconfirmModal({ action: 'participateCancel', message: '참가를 취소' });
  };

  const handleClickRegisterCancel = () => {
    reconfirmRegisterCancel(game.registerId);
  };

  const handleClickParticipateCancel = () => {
    reconfirmParticipateCancel(game.registerId);
  };

  return (
    <>
      {game.registerStatus === 'none' ? (
        <>
          <RegisterButton
            type="button"
            onClick={handleClickRegister}
          >
            참가 신청하기
          </RegisterButton>
          {registerServerError && (
            <p>{registerServerError}</p>
          )}
        </>
      ) : game.registerStatus === 'processing' ? (
        <>
          <RegisterButton
            type="button"
            onClick={handleClickRegisterCancel}
          >
            신청 취소하기
          </RegisterButton>
          {changeRegisterServerError && (
            <p>{changeRegisterServerError}</p>
          )}
        </>
      ) : (
        <>
          <RegisterButton
            type="button"
            onClick={handleClickParticipateCancel}
          >
            참가 취소하기
          </RegisterButton>
          {changeRegisterServerError && (
            <p>{changeRegisterServerError}</p>
          )}
        </>
      )}
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
            actionName === 'registerCancel'
              ? cancelRegisterGame
              : cancelParticipateGame
          )}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>
  );
}

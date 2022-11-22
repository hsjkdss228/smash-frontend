export default function PostsRegisterButton({
  gameId,
  registerId,
  registerStatus,
  registerToGame,
  cancelRegisterToGame,
  cancelParticipateToGame,
}) {
  const handleClickRegister = (targetGameId) => {
    registerToGame(targetGameId);
  };

  const handleClickCancelRegister = (targetRegisterId) => {
    cancelRegisterToGame(targetRegisterId);
  };

  const handleClickCancelParticipate = (targetRegisterId) => {
    cancelParticipateToGame(targetRegisterId);
  };

  if (registerStatus === 'none') {
    return (
      <button
        id={`posts-register-button-${gameId}`}
        type="button"
        onClick={() => handleClickRegister(gameId)}
      >
        신청
      </button>
    );
  }

  if (registerStatus === 'processing') {
    return (
      <button
        id={`posts-register-button-${gameId}`}
        type="button"
        onClick={() => handleClickCancelRegister(registerId)}
      >
        신청취소
      </button>
    );
  }

  // if (registerStatus === 'accepted')
  return (
    <button
      id={`posts-register-button-${gameId}`}
      type="button"
      onClick={() => handleClickCancelParticipate(registerId)}
    >
      참가취소
    </button>
  );
}

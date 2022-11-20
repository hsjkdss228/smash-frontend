export default function PostRegisterButton({
  registerStatus,
  onClickRegister,
  onClickRegisterCancel,
  onClickParticipateCancel,
}) {
  console.log(registerStatus);

  if (registerStatus === 'none') {
    return (
      <button
        type="button"
        onClick={onClickRegister}
      >
        신청
      </button>
    );
  }

  if (registerStatus === 'processing') {
    return (
      <button
        type="button"
        onClick={onClickRegisterCancel}
      >
        신청취소
      </button>
    );
  }

  // if (registerStatus === 'accepted')
  return (
    <button
      type="button"
      onClick={onClickParticipateCancel}
    >
      참가취소
    </button>
  );
}

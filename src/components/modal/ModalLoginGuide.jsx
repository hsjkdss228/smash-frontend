import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: '#000000bb',
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.5em',
    height: '12em',
    width: '20em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1em',
  },
};

export default function ModalLoginGuide({
  loginGuideModalState,
  setLoginGuideModalState,
  onClickLogin,
  onClickSelectTrialAccount,
}) {
  const handleCloseModal = () => {
    setLoginGuideModalState(false);
  };

  const handleClickLogin = () => {
    onClickLogin();
    handleCloseModal();
  };

  const handleClickSelectTrialAccount = () => {
    onClickSelectTrialAccount();
    handleCloseModal();
  };

  return (
    <ReactModal
      isOpen={loginGuideModalState}
      onRequestClose={handleCloseModal}
      style={modalStyle}
    >
      <p>
        로그인이 필요합니다.
      </p>
      <button
        type="button"
        onClick={handleClickLogin}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={handleClickSelectTrialAccount}
      >
        체험용 계정 선택
      </button>
    </ReactModal>
  );
}

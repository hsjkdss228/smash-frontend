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

export default function ModalReconfirm({
  action,
  actionMessage,
  reconfirmModalState,
  setReconfirmModalState,
}) {
  const closeModal = () => {
    setReconfirmModalState(false);
  };

  const handleClickProgress = async () => {
    await action();
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <ReactModal
      isOpen={reconfirmModalState}
      onRequestClose={handleCloseModal}
      style={modalStyle}
    >
      <p>
        정말로
        {' '}
        {actionMessage}
        하시겠습니까?
      </p>
      <button
        type="button"
        onClick={handleClickProgress}
      >
        예
      </button>
      <button
        type="button"
        onClick={handleCloseModal}
      >
        아니오
      </button>
    </ReactModal>
  );
}

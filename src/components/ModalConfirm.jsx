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

export default function ModalConfirm({
  actionMessage,
  confirmModalState,
  setConfirmModalState,
}) {
  const closeModal = () => {
    setConfirmModalState(false);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <ReactModal
      isOpen={confirmModalState}
      onRequestClose={handleCloseModal}
      style={modalStyle}
    >
      <p>
        {actionMessage}
        {' '}
        완료되었습니다.
      </p>
      <button
        type="button"
        onClick={handleCloseModal}
      >
        확인
      </button>
    </ReactModal>
  );
}

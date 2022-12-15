import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ComponentScreenContainer from '../components/ui/ComponentScreenContainer';
import Posts from '../components/Posts';
import ModalConfirm from '../components/ModalConfirm';
import PostsSearchAndSettings from '../components/PostsSearchAndSettings';

export default function PostsPage() {
  const [actionMessage, setActionMessage] = useState('');
  const [confirmModalState, setConfirmModalState] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const postStatus = !location.state
    ? null
    : location.state.postStatus;

  const seeConfirmModal = ({ message }) => {
    setActionMessage(message);
    setConfirmModalState(true);
  };

  useEffect(() => {
    if (postStatus) {
      seeConfirmModal({
        message: postStatus === 'created'
          ? '게시글 작성이'
          : '게시글 삭제가',
      });
    }
  }, []);

  const navigatePost = (postId) => {
    navigate(`/posts/${postId}`, {
      state: {
        postId,
      },
    });
  };

  return (
    <ComponentScreenContainer>
      <PostsSearchAndSettings />
      <Posts
        navigatePost={navigatePost}
      />
      {confirmModalState && (
        <ModalConfirm
          actionMessage={actionMessage}
          confirmModalState={confirmModalState}
          setConfirmModalState={setConfirmModalState}
        />
      )}
    </ComponentScreenContainer>
  );
}

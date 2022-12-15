import { useState } from 'react';

import styled from 'styled-components';

import usePostStore from '../hooks/usePostStore';
import ModalReconfirm from './ModalReconfirm';

import Button from './ui/PrimaryButton';

const Container = styled.div`
  
`;

export default function PostAuthorMenu({
  navigatePostsAfterDeleted,
}) {
  const [actionMessage, setActionMessage] = useState('');
  const [postIdToBeDeleted, setPostIdToBeDeleted] = useState(0);
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

  const postStore = usePostStore();

  const { post } = postStore;

  const deletePost = async () => {
    await postStore.deletePost(postIdToBeDeleted);
    navigatePostsAfterDeleted();
  };

  const seeReconfirmModal = ({ message }) => {
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmDeletePost = (targetPostId) => {
    setPostIdToBeDeleted(targetPostId);
    seeReconfirmModal({ message: '게시글을 삭제' });
  };

  const onClickDeletePost = () => {
    reconfirmDeletePost(post.id);
  };

  return (
    <>
      <Container>
        <Button
          type="button"
        >
          수정하기
        </Button>
        <Button
          type="button"
          onClick={onClickDeletePost}
        >
          삭제하기
        </Button>
      </Container>
      {reconfirmModalState && (
        <ModalReconfirm
          action={deletePost}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>

  );
}

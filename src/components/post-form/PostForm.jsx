import styled from 'styled-components';

import { useEffect, useState } from 'react';

import usePostFormStore from '../../hooks/usePostFormStore';

import ComponentScreenContainer from '../ui/ComponentScreenContainer';

import BackwardButton from '../backward-button/BackwardButton';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

import PostFormExerciseName from './PostFormExerciseName';
import PostFormDateTimeSection from './PostFormDateTimeSection';
import PostFormPlace from './PostFormPlace';
import PostFormTargetMemberCount from './PostFormTargetMemberCount';
import PostFormDetail from './PostFormDetail';

import ModalReconfirm from '../modal/ModalReconfirm';

const Top = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: flex-start;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;

  button {
    padding: 1.25em;
  }
`;

export default function PostForm({
  navigateBackward,
  navigatePostsAfterCreated,
}) {
  const [action, setAction] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

  const postFormStore = usePostFormStore();

  useEffect(() => {
    postFormStore.clearStates();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postId = await postFormStore.createPost();
    if (postId) {
      postFormStore.clearStates();
      navigatePostsAfterCreated();
    }
  };

  const resetForm = () => {
    postFormStore.clearStates();
  };

  const resetFormAndNavigateBackward = () => {
    resetForm();
    navigateBackward();
  };

  const seeReconfirmModal = ({ targetAction, message }) => {
    setAction(targetAction);
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmNavigateBackward = () => {
    seeReconfirmModal({
      targetAction: () => resetFormAndNavigateBackward,
      message: '????????? ????????? ??????',
    });
  };

  const reconfirmResetForm = () => {
    seeReconfirmModal({
      targetAction: () => resetForm,
      message: '?????? ????????? ?????????',
    });
  };

  const handleClickBackward = () => {
    reconfirmNavigateBackward();
  };

  const handleClickResetForm = () => {
    reconfirmResetForm();
  };

  return (
    <>
      <ComponentScreenContainer>
        <Top>
          <BackwardButton
            onClick={handleClickBackward}
          />
        </Top>
        <Form onSubmit={handleSubmit}>
          <PostFormExerciseName />
          <PostFormDateTimeSection />
          <PostFormPlace />
          <PostFormTargetMemberCount />
          <PostFormDetail />
          <Buttons>
            <SecondaryButton
              type="button"
              onClick={handleClickResetForm}
            >
              ?????????
            </SecondaryButton>
            <PrimaryButton
              type="submit"
            >
              ????????????
            </PrimaryButton>
          </Buttons>
        </Form>
      </ComponentScreenContainer>
      {reconfirmModalState && (
        <ModalReconfirm
          action={action}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>
  );
}

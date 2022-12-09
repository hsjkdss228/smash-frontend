import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalReconfirm from '../components/ModalReconfirm';
import PostForm from '../components/PostForm';
import usePostFormStore from '../hooks/usePostFormStore';

export default function PostFormPage() {
  const [actionMessage, setActionMessage] = useState('');
  const [reconfirmModalState, setReconfirmModalState] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const postFormStore = usePostFormStore();

  useEffect(() => {
    postFormStore.clearStates();
  }, []);

  const {
    gameExercise,
    gameStartHour,
    gameStartMinute,
    gameEndHour,
    gameEndMinute,
    gameDate,
    gamePlace,
    gameTargetMemberCount,
    postDetail,
    formErrors,
    serverError,
  } = postFormStore;

  const data = {
    gameExercise,
    gameStartHour,
    gameStartMinute,
    gameEndHour,
    gameEndMinute,
    gameDate,
    gamePlace,
    gameTargetMemberCount,
    postDetail,
  };

  const seeReconfirmModal = ({ message }) => {
    setActionMessage(message);
    setReconfirmModalState(true);
  };

  const reconfirmNavigateBackward = () => {
    seeReconfirmModal({ message: '게시글 작성을 중단' });
  };

  const navigateBackward = () => {
    postFormStore.clearStates();
    navigate(previousPath || '/');
  };

  const changeGameExercise = (exercise) => {
    postFormStore.changeGameExercise(exercise);
  };

  const changeGameDate = (date) => {
    postFormStore.changeGameDate(date);
  };

  const changeGameStartTimeAmPm = (startTimeAmPm) => {
    postFormStore.changeGameStartTimeAmPm(startTimeAmPm);
  };

  const changeGameStartHour = (startHour) => {
    postFormStore.changeGameStartHour(startHour);
  };

  const changeGameStartMinute = (startMinute) => {
    postFormStore.changeGameStartMinute(startMinute);
  };

  const changeGameEndTimeAmPm = (endTimeAmPm) => {
    postFormStore.changeGameEndTimeAmPm(endTimeAmPm);
  };

  const changeGameEndHour = (endHour) => {
    postFormStore.changeGameEndHour(endHour);
  };

  const changeGameEndMinute = (endMinute) => {
    postFormStore.changeGameEndMinute(endMinute);
  };

  const changePlaceName = (place) => {
    postFormStore.changePlaceName(place);
  };

  const changeGameTargetMemberCount = (targetMemberCount) => {
    postFormStore.changeGameTargetMemberCount(targetMemberCount);
  };

  const changePostDetail = (detail) => {
    postFormStore.changePostDetail(detail);
  };

  const createPost = async () => {
    const postId = await postFormStore.createPost();
    if (postId) {
      postFormStore.clearStates();
      navigate('/posts/list', {
        state: {
          postStatus: 'created',
        },
      });
    }
  };

  return (
    <>
      <PostForm
        data={data}
        reconfirmNavigateBackward={reconfirmNavigateBackward}
        changeGameExercise={changeGameExercise}
        changeGameDate={changeGameDate}
        changeGameStartTimeAmPm={changeGameStartTimeAmPm}
        changeGameStartHour={changeGameStartHour}
        changeGameStartMinute={changeGameStartMinute}
        changeGameEndTimeAmPm={changeGameEndTimeAmPm}
        changeGameEndHour={changeGameEndHour}
        changeGameEndMinute={changeGameEndMinute}
        changePlaceName={changePlaceName}
        changeGameTargetMemberCount={changeGameTargetMemberCount}
        changePostDetail={changePostDetail}
        createPost={createPost}
        formErrors={formErrors}
        serverError={serverError}
      />
      {reconfirmModalState && (
        <ModalReconfirm
          action={navigateBackward}
          actionMessage={actionMessage}
          reconfirmModalState={reconfirmModalState}
          setReconfirmModalState={setReconfirmModalState}
        />
      )}
    </>
  );
}

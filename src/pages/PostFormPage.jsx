import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import usePostFormStore from '../hooks/usePostFormStore';

export default function PostFormPage() {
  const navigate = useNavigate();

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
    errorCodeAndMessages,
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

  const navigateToBackward = () => {
    postFormStore.clearStates();
    navigate(-1);
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

  const changeGamePlace = (place) => {
    postFormStore.changeGamePlace(place);
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
      navigate('/posts/list');
    }
  };

  return (
    <PostForm
      data={data}
      navigateToBackward={navigateToBackward}
      changeGameExercise={changeGameExercise}
      changeGameDate={changeGameDate}
      changeGameStartTimeAmPm={changeGameStartTimeAmPm}
      changeGameStartHour={changeGameStartHour}
      changeGameStartMinute={changeGameStartMinute}
      changeGameEndTimeAmPm={changeGameEndTimeAmPm}
      changeGameEndHour={changeGameEndHour}
      changeGameEndMinute={changeGameEndMinute}
      changeGamePlace={changeGamePlace}
      changeGameTargetMemberCount={changeGameTargetMemberCount}
      changePostDetail={changePostDetail}
      createPost={createPost}
      errors={errorCodeAndMessages}
    />
  );
}

import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import SelectTime from './SelectTime';
import BackwardButton from './ui/BackwardButton';

const Container = styled.article`
  padding-block: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitButton = styled.button`
  font-size: 1.3em;
  border: 1px solid #000;
  padding: 1em 1.5em;
`;

export default function PostForm({
  data,
  navigateToBackward,
  changeGameExercise,
  changeGameDate,
  changeGameStartHour,
  changeGameStartMinute,
  changeGameEndHour,
  changeGameEndMinute,
  changeGamePlace,
  changeGameTargetMemberCount,
  changePostDetail,
  createPost,
}) {
  const handleClickBackward = () => {
    navigateToBackward();
  };

  const handleChangeGameExercise = (event) => {
    const { value } = event.target;
    changeGameExercise(value);
  };

  const handleChangeGameDate = (date) => {
    changeGameDate(date);
  };

  const handleChangeGameStartHour = (event) => {
    const { value } = event.target;
    changeGameStartHour(value);
  };

  const handleChangeGameStartMinute = (event) => {
    const { value } = event.target;
    changeGameStartMinute(value);
  };

  const handleChangeGameEndHour = (event) => {
    const { value } = event.target;
    changeGameEndHour(value);
  };

  const handleChangeGameEndMinute = (event) => {
    const { value } = event.target;
    changeGameEndMinute(value);
  };

  const handleChangeGamePlace = (event) => {
    const { value } = event.target;
    changeGamePlace(value);
  };

  const handleChangeGameTargetMemberCount = (event) => {
    const { value } = event.target;
    changeGameTargetMemberCount(value);
  };

  const handleChangePostDetail = (event) => {
    const { value } = event.target;
    changePostDetail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  return (
    <Container>
      <BackwardButton
        type="button"
        onClick={handleClickBackward}
      >
        ⬅️
      </BackwardButton>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input-game-exercise">
            종목을 입력하세요:
          </label>
          <input
            id="input-game-exercise"
            type="text"
            value={data.gameExercise}
            onChange={(event) => handleChangeGameExercise(event)}
          />
        </div>
        <div>
          <label htmlFor="input-game-date">
            날짜를 선택하세요:
          </label>
          <DatePicker
            id="input-game-date"
            selected={data.gameDate}
            onChange={(date) => handleChangeGameDate(date)}
            dateFormat="yyyy년 MM월 dd일"
          />
        </div>
        <div>
          <p>
            시간을 선택하세요:
          </p>
          <SelectTime
            id="input-game-start-hour"
            onChange={handleChangeGameStartHour}
            type="start"
            time="hour"
          />
          <SelectTime
            id="input-game-start-minute"
            onChange={handleChangeGameStartMinute}
            type="start"
            time="minute"
          />
          <p>부터</p>
          <SelectTime
            id="input-game-end-hour"
            onChange={handleChangeGameEndHour}
            type="end"
            time="hour"
          />
          <SelectTime
            id="input-game-end-minute"
            onChange={handleChangeGameEndMinute}
            type="end"
            time="minute"
          />
          <p>까지</p>
        </div>
        <div>
          <label htmlFor="input-game-place">
            장소를 입력하세요:
          </label>
          <input
            id="input-game-place"
            type="text"
            value={data.gamePlace}
            onChange={handleChangeGamePlace}
          />
        </div>
        <div>
          <label htmlFor="input-game-target-member-count">
            모집할 인원 수를 입력하세요:
          </label>
          <input
            id="input-game-target-member-count"
            type="number"
            value={data.gameTargetMemberCount}
            onChange={handleChangeGameTargetMemberCount}
          />
        </div>
        <div>
          <label htmlFor="input-post-detail">
            상세 내용을 입력하세요:
          </label>
          <textarea
            id="input-post-detail"
            value={data.postDetail}
            onChange={handleChangePostDetail}
          />
        </div>
        <SubmitButton
          type="submit"
        >
          작성하기
        </SubmitButton>
      </Form>
    </Container>
  );
}

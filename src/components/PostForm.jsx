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
  changeGameStartTimeAmPm,
  changeGameStartHour,
  changeGameStartMinute,
  changeGameEndTimeAmPm,
  changeGameEndHour,
  changeGameEndMinute,
  changeGamePlace,
  changeGameTargetMemberCount,
  changePostDetail,
  createPost,
  errors,
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

  const handleChangeGameStartTimeAmPm = (event) => {
    const { value } = event.target;
    changeGameStartTimeAmPm(value);
  };

  const handleChangeGameStartHour = (event) => {
    const { value } = event.target;
    changeGameStartHour(value);
  };

  const handleChangeGameStartMinute = (event) => {
    const { value } = event.target;
    changeGameStartMinute(value);
  };

  const handleChangeGameEndTimeAmPm = (event) => {
    const { value } = event.target;
    changeGameEndTimeAmPm(value);
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
            종목
          </label>
          <input
            id="input-game-exercise"
            type="text"
            value={data.gameExercise}
            onChange={(event) => handleChangeGameExercise(event)}
          />
        </div>
        {errors['100'] ? (
          <p>{errors['100']}</p>
        ) : null}
        <div>
          <label htmlFor="input-game-date">
            날짜
          </label>
          <DatePicker
            id="input-game-date"
            selected={data.gameDate}
            onChange={(date) => handleChangeGameDate(date)}
            dateFormat="yyyy년 MM월 dd일"
          />
          {errors['101'] ? (
            <p>{errors['101']}</p>
          ) : null}
        </div>
        <div>
          <p>
            시간
          </p>
          <div>
            <input
              id="input-game-start-time-am"
              type="radio"
              name="start-time-am-pm"
              value="am"
              onChange={handleChangeGameStartTimeAmPm}
            />
            <label htmlFor="input-game-start-time-am">
              <span>시작</span>
              {' '}
              오전
            </label>
            <input
              id="input-game-start-time-pm"
              type="radio"
              name="start-time-am-pm"
              value="pm"
              onChange={handleChangeGameStartTimeAmPm}
            />
            <label htmlFor="input-game-start-time-pm">
              <span>시작</span>
              {' '}
              오후
            </label>
            <SelectTime
              id="input-game-start-hour"
              onChange={handleChangeGameStartHour}
              type="start"
              time="hour"
              value={data.gameStartHour}
            />
            <SelectTime
              id="input-game-start-minute"
              onChange={handleChangeGameStartMinute}
              type="start"
              time="minute"
              value={data.gameStartMinute}
            />
          </div>
          <p>부터</p>
          <div>
            <input
              id="input-game-end-time-am"
              type="radio"
              name="end-time-am-pm"
              value="am"
              onChange={handleChangeGameEndTimeAmPm}
            />
            <label htmlFor="input-game-end-time-am">
              <span>종료</span>
              {' '}
              오전
            </label>
            <input
              id="input-game-end-time-pm"
              type="radio"
              name="end-time-am-pm"
              value="pm"
              onChange={handleChangeGameEndTimeAmPm}
            />
            <label htmlFor="input-game-end-time-pm">
              <span>종료</span>
              {' '}
              오후
            </label>
            <SelectTime
              id="input-game-end-hour"
              onChange={handleChangeGameEndHour}
              type="end"
              time="hour"
              value={data.gameEndHour}
            />
            <SelectTime
              id="input-game-end-minute"
              onChange={handleChangeGameEndMinute}
              type="end"
              time="minute"
              value={data.gameEndMinute}
            />
          </div>
          <p>까지</p>
          {errors['102'] || errors['103'] || errors['104']
            || errors['105'] || errors['106'] || errors['107'] ? (
              <p>
                입력하지 않은 운동 시간이 있습니다.
                {' '}
                {(errors['102'] || errors['105']) && '(오전/오후)'}
                {' '}
                {(errors['103'] || errors['106']) && '(시)'}
                {' '}
                {(errors['104'] || errors['107']) && '(분)'}
              </p>
            ) : null}
        </div>
        <div>
          <label htmlFor="input-game-place">
            장소
          </label>
          <input
            id="input-game-place"
            type="text"
            value={data.gamePlace}
            onChange={handleChangeGamePlace}
          />
          {errors['108'] ? (
            <p>{errors['108']}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="input-game-target-member-count">
            모집 인원
          </label>
          <input
            id="input-game-target-member-count"
            type="number"
            value={data.gameTargetMemberCount}
            onChange={handleChangeGameTargetMemberCount}
          />
        </div>
        {errors['109'] ? (
          <p>{errors['109']}</p>
        ) : null}
        <div>
          <label htmlFor="input-post-detail">
            상세 내용
          </label>
          <textarea
            id="input-post-detail"
            value={data.postDetail}
            onChange={handleChangePostDetail}
          />
          {errors['110'] ? (
            <p>{errors['110']}</p>
          ) : null}
        </div>
        <SubmitButton
          type="submit"
        >
          작성하기
        </SubmitButton>
      </Form>
      {errors['111'] ? (
        <p>{errors['111']}</p>
      ) : null}
      {errors['112'] ? (
        <p>{errors['112']}</p>
      ) : null}
    </Container>
  );
}

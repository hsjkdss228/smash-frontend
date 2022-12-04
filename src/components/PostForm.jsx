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

  section {
    width: 80%;
    padding: 1em;
    border: 1px solid #000;
    margin-block: .75em;
  }
`;

const ExerciseSection = styled.section`
  
`;

const TitleAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Label = styled.label`
  font-size: 1.5em;
  margin-bottom: .3em;
`;

const Error = styled.p`
  font-size: .8em;
  color: #f00;
`;

const TextInput = styled.input`
  width: 100%;
`;

const DateAndTimeSection = styled.section`
  span {
    display: none;
  }
`;

const DateSection = styled.div`
  margin-bottom: 1.5em;
`;

const TimeSection = styled.div`
  
`;

const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AmPm = styled.div`
  margin-right: .5em;

  label {
    margin-right: .5em;
  }
`;

const HourAndMinute = styled.div`
  display: flex;
  div {
    margin-inline: .3em;
  }
`;

const PlaceSection = styled.section`
  
`;

const TargetMemberCountSection = styled.section`
  
`;

const DetailSection = styled.section`

`;

const Textarea = styled.textarea`
  width: 100%;
`;

const SubmitButton = styled.button`
  font-size: 1.3em;
  border: 1px solid #000;
  padding: 1em 1.5em;
`;

export default function PostForm({
  data,
  reconfirmNavigateBackward,
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
  formErrors,
  serverError,
}) {
  const handleClickBackward = () => {
    reconfirmNavigateBackward();
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
        <ExerciseSection>
          <TitleAndError>
            <Label htmlFor="input-game-exercise">
              종목
            </Label>
            {formErrors.BLANK_GAME_EXERCISE ? (
              <Error>{formErrors.BLANK_GAME_EXERCISE}</Error>
            ) : null}
          </TitleAndError>
          <TextInput
            id="input-game-exercise"
            type="text"
            placeholder="운동 종목 이름"
            value={data.gameExercise}
            onChange={(event) => handleChangeGameExercise(event)}
          />
        </ExerciseSection>
        <DateAndTimeSection>
          <DateSection>
            <TitleAndError>
              <Label htmlFor="input-game-date">
                날짜
              </Label>
              {formErrors.BLANK_GAME_START_AM_PM
                || formErrors.BLANK_GAME_START_HOUR
                || formErrors.BLANK_GAME_START_MINUTE
                || formErrors.BLANK_GAME_END_AM_PM
                || formErrors.BLANK_GAME_END_HOUR
                || formErrors.BLANK_GAME_END_MINUTE ? (
                  <Error>
                    {(formErrors.BLANK_GAME_START_AM_PM
                    || formErrors.BLANK_GAME_END_AM_PM
                    || formErrors.BLANK_GAME_START_HOUR
                    || formErrors.BLANK_GAME_END_HOUR
                    || formErrors.BLANK_GAME_START_MINUTE
                    || formErrors.BLANK_GAME_END_MINUTE)}
                  </Error>
                ) : null}
            </TitleAndError>
            <DatePicker
              id="input-game-date"
              selected={data.gameDate}
              onChange={(date) => handleChangeGameDate(date)}
              dateFormat="yyyy년 MM월 dd일"
            />
            {formErrors.BLANK_GAME_DATE ? (
              <Error>{formErrors.BLANK_GAME_DATE}</Error>
            ) : null}
          </DateSection>
          <TimeSection>
            <Label>
              시간
            </Label>
            <Time>
              <AmPm>
                <input
                  id="input-game-start-time-am"
                  type="radio"
                  name="start-time-am-pm"
                  value="am"
                  onChange={handleChangeGameStartTimeAmPm}
                />
                <label htmlFor="input-game-start-time-am">
                  <span>시작 </span>
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
                  <span>시작 </span>
                  오후
                </label>
              </AmPm>
              <HourAndMinute>
                <SelectTime
                  id="input-game-start-hour"
                  onChange={handleChangeGameStartHour}
                  type="start"
                  time="hour"
                  value={data.gameStartHour}
                />
                <p>:</p>
                <SelectTime
                  id="input-game-start-minute"
                  onChange={handleChangeGameStartMinute}
                  type="start"
                  time="minute"
                  value={data.gameStartMinute}
                />
              </HourAndMinute>
              <p>부터</p>
            </Time>
            <Time>
              <AmPm>
                <input
                  id="input-game-end-time-am"
                  type="radio"
                  name="end-time-am-pm"
                  value="am"
                  onChange={handleChangeGameEndTimeAmPm}
                />
                <label htmlFor="input-game-end-time-am">
                  <span>종료 </span>
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
                  <span>종료 </span>
                  오후
                </label>
              </AmPm>
              <HourAndMinute>
                <SelectTime
                  id="input-game-end-hour"
                  onChange={handleChangeGameEndHour}
                  type="end"
                  time="hour"
                  value={data.gameEndHour}
                />
                <p>:</p>
                <SelectTime
                  id="input-game-end-minute"
                  onChange={handleChangeGameEndMinute}
                  type="end"
                  time="minute"
                  value={data.gameEndMinute}
                />
                <p>까지</p>
              </HourAndMinute>
            </Time>
          </TimeSection>
        </DateAndTimeSection>
        <PlaceSection>
          <TitleAndError>
            <Label htmlFor="input-game-place">
              장소
            </Label>
            {formErrors.BLANK_GAME_PLACE ? (
              <Error>{formErrors.BLANK_GAME_PLACE}</Error>
            ) : null}
          </TitleAndError>
          <TextInput
            id="input-game-place"
            type="text"
            placeholder="운동 장소 이름"
            value={data.gamePlace}
            onChange={handleChangeGamePlace}
          />
        </PlaceSection>
        <TargetMemberCountSection>
          <TitleAndError>
            <Label htmlFor="input-game-target-member-count">
              모집 인원
            </Label>
            {formErrors.NULL_GAME_TARGET_MEMBER_COUNT ? (
              <Error>{formErrors.NULL_GAME_TARGET_MEMBER_COUNT}</Error>
            ) : null}
          </TitleAndError>
          <TextInput
            id="input-game-target-member-count"
            type="number"
            placeholder="운동 모집 인원 (2명 이상)"
            value={data.gameTargetMemberCount}
            onChange={handleChangeGameTargetMemberCount}
          />
        </TargetMemberCountSection>
        <DetailSection>
          <TitleAndError>
            <Label htmlFor="input-post-detail">
              상세 내용
            </Label>
            {formErrors.BLANK_POST_DETAIL ? (
              <Error>{formErrors.BLANK_POST_DETAIL}</Error>
            ) : null}
          </TitleAndError>
          <Textarea
            id="input-post-detail"
            placeholder="운동 상세 내용을 입력해주세요."
            value={data.postDetail}
            onChange={handleChangePostDetail}
          />
        </DetailSection>
        <SubmitButton
          type="submit"
        >
          작성하기
        </SubmitButton>
      </Form>
      {serverError ? (
        <p>{serverError}</p>
      ) : null}
    </Container>
  );
}

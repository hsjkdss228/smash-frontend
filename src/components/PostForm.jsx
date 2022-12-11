/* eslint-disable no-nested-ternary */

import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import Container from './ui/ComponentScreenContainer';
import Section from './ui/ComponentSectionContainer';
import SelectTime from './SelectTime';
import BackwardButton from './BackwardButton';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';

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

const TitleAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
`;

const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
  color: #FF7A63;
`;

const Error = styled.p`
  font-size: .8em;
  color: #f00;
`;

const TextInput = styled.input`
  width: 100%;
  font-size: .9em;
  padding: .7em;
  border: ${({ hasError }) => (
    hasError ? '1px solid #f00' : '1px solid #D8D8D8'
  )};
  margin-bottom: .3em;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: .8em;
    color: ${({ hasError }) => (
    hasError ? '#f00' : '#C0C0C0'
  )};
  }
`;

const DateSection = styled.div`
  margin-bottom: 1.5em;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;

  .react-datepicker {
    border: none;
  }

  .react-datepicker__month-container {
    width: 30em;
  }

  .react-datepicker__header {
    background: none;
    border-bottom: none;
  }

  .react-datepicker__day-name {
    width: 3rem;
  }

  .react-datepicker__month {
    margin-top: 0;
  }

  .react-datepicker__current-month {
    font-size: 1.5em;
    font-weight: 400;
    padding-bottom: .7em;
    color: #A0A0A0;
  }

  .react-datepicker__day-names {
    padding-top: .5em;
    border-top: 1px solid #BDBDBD;
  }

  .react-datepicker__day {
    width: 3rem;
  }

  .react-datepicker__day--selected {
    border-radius: 2em;
    background-color: #FF7A63;
  }
`;

const DateLabel = styled.label`
  display: none;
`;

const TimeSection = styled.div`
  
`;

const Time = styled.div`
  margin-bottom: .5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AmPm = styled.div`
  margin-right: .5em;

  label {
    margin-right: .5em;
  }

  input {
    display: none;
  }

  span {
    display: none;
  }
`;

const AmButton = styled.button`
  color: ${({ selectedState }) => (
    selectedState === 'am'
      ? '#fff'
      : '#FF7A63'
  )};
  padding: .5em 1.25em;
  border: ${({ selectedState }) => (
    selectedState === 'am'
      ? '1px solid transparent'
      : '1px solid #CCC'
  )};
  border-radius: 5px;
  margin-inline: .3em;
  background-color: ${({ selectedState }) => (
    selectedState === 'am'
      ? '#FF7A63'
      : '#fff'
  )};

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
    cursor: pointer;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
    cursor: pointer;
  }
`;

const PmButton = styled.button`
  color: ${({ selectedState }) => (
    selectedState === 'pm'
      ? '#fff'
      : '#FF7A63'
  )};
  padding: .5em 1.25em;
  border: ${({ selectedState }) => (
    selectedState === 'pm'
      ? '1px solid transparent'
      : '1px solid #CCC'
  )};
  border-radius: 5px;
  margin-inline: .3em;
  background-color: ${({ selectedState }) => (
    selectedState === 'pm'
      ? '#FF7A63'
      : '#fff'
  )};

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
    cursor: pointer;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
    cursor: pointer;
  }
`;

const HourAndMinute = styled.div`
  display: flex;

  div {
    margin-inline: .3em;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: .9em;
  padding: .7em;
  border: ${({ hasError }) => (
    hasError ? '1px solid #f00' : '1px solid #D8D8D8'
  )};
  margin-bottom: .3em;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: 1em;
    color: ${({ hasError }) => (
    hasError ? '#f00' : '#C0C0C0'
  )};
  }
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
  changePlaceName,
  changeGameTargetMemberCount,
  changePostDetail,
  resetForm,
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

  const handleChangePlaceName = (event) => {
    const { value } = event.target;
    changePlaceName(value);
  };

  const handleChangeGameTargetMemberCount = (event) => {
    const { value } = event.target;
    changeGameTargetMemberCount(value);
  };

  const handleChangePostDetail = (event) => {
    const { value } = event.target;
    changePostDetail(value);
  };

  const handleClickResetForm = () => {
    resetForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  return (
    <Container>
      <Top>
        <BackwardButton
          onClick={handleClickBackward}
        />
      </Top>
      <Form onSubmit={handleSubmit}>
        <Section>
          <TitleAndError>
            <Label htmlFor="input-game-exercise">
              종목
            </Label>
          </TitleAndError>
          <TextInput
            id="input-game-exercise"
            type="text"
            placeholder={(
              formErrors.BLANK_GAME_EXERCISE ? (
                formErrors.BLANK_GAME_EXERCISE
              ) : '종목 이름을 입력해주세요.'
            )}
            value={data.gameExercise}
            onChange={(event) => handleChangeGameExercise(event)}
            hasError={formErrors.BLANK_GAME_EXERCISE}
          />
        </Section>
        <Section>
          <DateSection>
            <TitleAndError>
              <Label>
                날짜 및 시간
              </Label>
              <DateLabel htmlFor="input-game-date">
                날짜
              </DateLabel>
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
            <DatePickerWrapper>
              <DatePicker
                id="input-game-date"
                locale={ko}
                minDate={new Date()}
                selected={data.gameDate}
                onChange={(date) => handleChangeGameDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                inline
              />
            </DatePickerWrapper>
            {formErrors.BLANK_GAME_DATE ? (
              <Error>{formErrors.BLANK_GAME_DATE}</Error>
            ) : null}
          </DateSection>
          <TimeSection>
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
                  <AmButton
                    className="input-game-start-time-am"
                    selectedState={data.gameStartTimeAmPm}
                    type="button"
                    value="am"
                    onClick={handleChangeGameStartTimeAmPm}
                  >
                    <span>시작 </span>
                    오전
                  </AmButton>
                </label>
                <input
                  id="input-game-start-time-pm"
                  type="radio"
                  name="start-time-am-pm"
                  value="pm"
                  onChange={handleChangeGameStartTimeAmPm}
                />
                <label htmlFor="input-game-start-time-pm">
                  <PmButton
                    className="input-game-start-time-pm"
                    selectedState={data.gameStartTimeAmPm}
                    type="button"
                    value="pm"
                    onClick={handleChangeGameStartTimeAmPm}
                  >
                    <span>시작 </span>
                    오후
                  </PmButton>
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
                  <AmButton
                    className="input-game-end-time-am"
                    selectedState={data.gameEndTimeAmPm}
                    type="button"
                    value="am"
                    onClick={handleChangeGameEndTimeAmPm}
                  >
                    <span>종료 </span>
                    오전
                  </AmButton>
                </label>
                <input
                  id="input-game-end-time-pm"
                  type="radio"
                  name="end-time-am-pm"
                  value="pm"
                  onChange={handleChangeGameEndTimeAmPm}
                />
                <label htmlFor="input-game-end-time-pm">
                  <PmButton
                    className="input-game-end-time-pm"
                    selectedState={data.gameEndTimeAmPm}
                    type="button"
                    value="pm"
                    onClick={handleChangeGameEndTimeAmPm}
                  >
                    <span>종료 </span>
                    오후
                  </PmButton>
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
        </Section>
        <Section>
          <TitleAndError>
            <Label htmlFor="input-place-name">
              장소
            </Label>
            {serverError.includes('주어진 장소 이름에 해당하는 장소를 찾을 수 없습니다') && (
              <Error>등록되지 않은 장소입니다.</Error>
            )}
          </TitleAndError>
          <TextInput
            id="input-place-name"
            type="text"
            placeholder={(
              formErrors.BLANK_PLACE_NAME ? (
                formErrors.BLANK_PLACE_NAME
              ) : '장소 이름을 입력해주세요.'
            )}
            value={data.placeName}
            onChange={handleChangePlaceName}
            hasError={(
              formErrors.BLANK_PLACE_NAME
              || serverError.includes('주어진 장소 이름에 해당하는 장소를 찾을 수 없습니다')
            )}
          />
        </Section>
        <Section>
          <TitleAndError>
            <Label htmlFor="input-game-target-member-count">
              모집 인원
            </Label>
          </TitleAndError>
          <TextInput
            id="input-game-target-member-count"
            type="number"
            placeholder={(
              formErrors.NULL_GAME_TARGET_MEMBER_COUNT ? (
                formErrors.NULL_GAME_TARGET_MEMBER_COUNT
              ) : '운동 모집 인원 (2명 이상)'
            )}
            value={data.gameTargetMemberCount}
            onChange={handleChangeGameTargetMemberCount}
            hasError={formErrors.NULL_GAME_TARGET_MEMBER_COUNT}
          />
        </Section>
        <Section>
          <TitleAndError>
            <Label htmlFor="input-post-detail">
              상세 내용
            </Label>
          </TitleAndError>
          {/* TODO: 글자 수 제한 (2000자) 프론트엔드 및 백엔드 예외 처리 추가 */}
          <Textarea
            id="input-post-detail"
            placeholder={(
              formErrors.BLANK_POST_DETAIL ? (
                formErrors.BLANK_POST_DETAIL
              ) : '운동 상세 내용을 입력해주세요.'
            )}
            rows="12"
            value={data.postDetail}
            onChange={handleChangePostDetail}
            hasError={formErrors.BLANK_POST_DETAIL}
          />
        </Section>
        <Buttons>
          <SecondaryButton
            type="button"
            onClick={handleClickResetForm}
          >
            초기화
          </SecondaryButton>
          <PrimaryButton
            type="submit"
          >
            작성하기
          </PrimaryButton>
        </Buttons>
      </Form>
    </Container>
  );
}

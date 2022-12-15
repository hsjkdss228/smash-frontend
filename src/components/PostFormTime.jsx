import styled from 'styled-components';

import usePostFormStore from '../hooks/usePostFormStore';

import SelectTime from './SelectTime';

const Container = styled.div`
  
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

export default function PostFormTime() {
  const postFormStore = usePostFormStore();

  const {
    gameStartTimeAmPm,
    gameStartHour,
    gameStartMinute,
    gameEndTimeAmPm,
    gameEndHour,
    gameEndMinute,
  } = postFormStore;

  const handleChangeGameStartTimeAmPm = (event) => {
    const { value } = event.target;
    postFormStore.changeGameStartTimeAmPm(value);
  };

  const handleChangeGameStartHour = (event) => {
    const { value } = event.target;
    postFormStore.changeGameStartHour(value);
  };

  const handleChangeGameStartMinute = (event) => {
    const { value } = event.target;
    postFormStore.changeGameStartMinute(value);
  };

  const handleChangeGameEndTimeAmPm = (event) => {
    const { value } = event.target;
    postFormStore.changeGameEndTimeAmPm(value);
  };

  const handleChangeGameEndHour = (event) => {
    const { value } = event.target;
    postFormStore.changeGameEndHour(value);
  };

  const handleChangeGameEndMinute = (event) => {
    const { value } = event.target;
    postFormStore.changeGameEndMinute(value);
  };

  return (
    <Container>
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
              selectedState={gameStartTimeAmPm}
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
              selectedState={gameStartTimeAmPm}
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
            value={gameStartHour}
          />
          <p>:</p>
          <SelectTime
            id="input-game-start-minute"
            onChange={handleChangeGameStartMinute}
            type="start"
            time="minute"
            value={gameStartMinute}
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
              selectedState={gameEndTimeAmPm}
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
              selectedState={gameEndTimeAmPm}
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
            value={gameEndHour}
          />
          <p>:</p>
          <SelectTime
            id="input-game-end-minute"
            onChange={handleChangeGameEndMinute}
            type="end"
            time="minute"
            value={gameEndMinute}
          />
          <p>까지</p>
        </HourAndMinute>
      </Time>
    </Container>
  );
}

import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import styled from 'styled-components';

import DatePicker from 'react-datepicker';

import usePostFormStore from '../hooks/usePostFormStore';

const Container = styled.div`
  
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

export default function PostFormDate() {
  const postFormStore = usePostFormStore();

  const { gameDate } = postFormStore;

  const handleChangeGameDate = (date) => {
    postFormStore.changeGameDate(date);
  };

  return (
    <Container>
      <DateSection>
        <DateLabel htmlFor="input-game-date">
          날짜
        </DateLabel>
        <DatePickerWrapper>
          <DatePicker
            label="input-game-date"
            id="input-game-date"
            locale={ko}
            minDate={new Date()}
            selected={gameDate}
            onChange={(date) => handleChangeGameDate(date)}
            dateFormat="yyyy년 MM월 dd일"
            inline
          />
        </DatePickerWrapper>
      </DateSection>
    </Container>
  );
}

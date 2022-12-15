import styled from 'styled-components';
import usePostFormStore from '../hooks/usePostFormStore';

import ComponentSectionContainer from './ui/ComponentSectionContainer';

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

export default function PostFormExerciseName() {
  const postFormStore = usePostFormStore();

  const {
    gameExercise,
    formErrors,
  } = postFormStore;

  const handleChangeGameExercise = (event) => {
    const { value } = event.target;
    postFormStore.changeGameExercise(value);
  };

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
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
        value={gameExercise}
        onChange={(event) => handleChangeGameExercise(event)}
        hasError={formErrors.BLANK_GAME_EXERCISE}
      />
    </ComponentSectionContainer>
  );
}

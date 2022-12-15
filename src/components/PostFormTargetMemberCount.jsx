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

export default function PostFormTargetMemberCount() {
  const postFormStore = usePostFormStore();

  const {
    gameTargetMemberCount,
    formErrors,
  } = postFormStore;

  const handleChangeGameTargetMemberCount = (event) => {
    const { value } = event.target;
    postFormStore.changeGameTargetMemberCount(value);
  };

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
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
        value={gameTargetMemberCount}
        onChange={handleChangeGameTargetMemberCount}
        hasError={formErrors.NULL_GAME_TARGET_MEMBER_COUNT}
      />
    </ComponentSectionContainer>
  );
}

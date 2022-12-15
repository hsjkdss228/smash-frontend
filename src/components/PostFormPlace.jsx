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

export default function PostFormPlace() {
  const postFormStore = usePostFormStore();

  const {
    placeName,
    formErrors,
    serverError,
  } = postFormStore;

  const handleChangePlaceName = (event) => {
    const { value } = event.target;
    postFormStore.changePlaceName(value);
  };

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <TitleAndError>
        <Label htmlFor="input-place-name">
          장소
        </Label>
        {serverError && (
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
        value={placeName}
        onChange={handleChangePlaceName}
        hasError={(
          formErrors.BLANK_PLACE_NAME
              || serverError
        )}
      />
    </ComponentSectionContainer>
  );
}

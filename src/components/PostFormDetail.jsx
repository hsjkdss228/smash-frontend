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

export default function PostFormDetail() {
  const postFormStore = usePostFormStore();

  const {
    postDetail,
    formErrors,
  } = postFormStore;

  const handleChangePostDetail = (event) => {
    const { value } = event.target;
    postFormStore.changePostDetail(value);
  };

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
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
        value={postDetail}
        onChange={handleChangePostDetail}
        hasError={formErrors.BLANK_POST_DETAIL}
      />
    </ComponentSectionContainer>
  );
}

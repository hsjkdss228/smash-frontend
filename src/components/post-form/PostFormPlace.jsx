/* eslint-disable no-nested-ternary */

import styled from 'styled-components';
import usePostFormStore from '../../hooks/usePostFormStore';
import PostFormPlaceInputModeButtons from './PostFormPlaceInputModeButtons';
import PostFormPlaceSearchSection from './PostFormPlaceSearchSection';
import PostFormPlaceSelectedPlaceSection from './PostFormPlaceSelectedPlaceSection';

import ComponentSectionContainer from '../ui/ComponentSectionContainer';

const TitleAndSelectModeButtonsAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
`;

const Title = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #FF7A63;
`;

const Error = styled.p`
  font-size: .8em;
  color: #f00;
`;

export default function PostFormPlace() {
  const postFormStore = usePostFormStore();

  const {
    serverError,
  } = postFormStore;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <TitleAndSelectModeButtonsAndError>
        <Title>
          장소
        </Title>
        <PostFormPlaceInputModeButtons />
        {serverError && (
          <Error>등록되지 않은 장소입니다.</Error>
        )}
      </TitleAndSelectModeButtonsAndError>
      <PostFormPlaceSearchSection />
      <PostFormPlaceSelectedPlaceSection />
    </ComponentSectionContainer>
  );
}

/* eslint-disable no-nested-ternary */

import styled from 'styled-components';

import usePostFormStore from '../../hooks/usePostFormStore';

import ComponentSectionContainer from '../ui/ComponentSectionContainer';

import PostFormDate from './PostFormDate';
import PostFormTime from './PostFormTime';

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

export default function PostForm() {
  const postFormStore = usePostFormStore();

  const { formErrors } = postFormStore;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <TitleAndError>
        <Label>
          날짜 및 시간
        </Label>
        {(formErrors.BLANK_GAME_DATE
          || formErrors.BLANK_GAME_START_AM_PM
          || formErrors.BLANK_GAME_START_HOUR
          || formErrors.BLANK_GAME_START_MINUTE
          || formErrors.BLANK_GAME_END_AM_PM
          || formErrors.BLANK_GAME_END_HOUR
          || formErrors.BLANK_GAME_END_MINUTE) && (
          <Error>
            {(formErrors.BLANK_GAME_DATE
              || formErrors.BLANK_GAME_START_AM_PM
              || formErrors.BLANK_GAME_END_AM_PM
              || formErrors.BLANK_GAME_START_HOUR
              || formErrors.BLANK_GAME_END_HOUR
              || formErrors.BLANK_GAME_START_MINUTE
              || formErrors.BLANK_GAME_END_MINUTE)}
          </Error>
        )}
      </TitleAndError>
      <PostFormDate />
      <PostFormTime />
    </ComponentSectionContainer>
  );
}

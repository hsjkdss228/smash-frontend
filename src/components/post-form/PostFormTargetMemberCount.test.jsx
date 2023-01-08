import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormTargetMemberCount from './PostFormTargetMemberCount';

let gameTargetMemberCount;
let formErrors;
const changeGameTargetMemberCount = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  gameTargetMemberCount,
  formErrors,
  changeGameTargetMemberCount,
}));

describe('PostFormTargetMemberCount', () => {
  function renderPostFormTargetMemberCount() {
    render((
      <PostFormTargetMemberCount />
    ));
  }

  beforeEach(() => {
    gameTargetMemberCount = '';
    formErrors = {
      NULL_GAME_TARGET_MEMBER_COUNT: '',
    };
  });

  context('게시글 입력 폼 중 모집 인원 수 입력 폼은', () => {
    it('제목, 모집 인원 수 입력란으로 구성됨', () => {
      renderPostFormTargetMemberCount();

      screen.getByText('모집 인원');
      screen.getByPlaceholderText('운동 모집 인원 (2명 이상)');
    });
  });

  context('모집 인원 수 입력란에 내용을 입력할 경우', () => {
    it('모집 인원 수 입력 상태를 변경하는 함수 호출', () => {
      renderPostFormTargetMemberCount();

      fireEvent.change(screen.getByLabelText('모집 인원'), {
        target: { value: 10 },
      });
      expect(changeGameTargetMemberCount).toBeCalledWith('10');
    });
  });

  context('에러 상태에 모집 인원 수를 입력하지 않은 에러가 존재할 경우', () => {
    beforeEach(() => {
      formErrors = {
        NULL_GAME_TARGET_MEMBER_COUNT: '모집 인원 수를 입력하지 않았습니다.',
      };
    });

    it('모집 인원 수를 입력하지 않았다는 에러 메시지를 Placeholder에 출력', () => {
      renderPostFormTargetMemberCount();

      screen.getByPlaceholderText('모집 인원 수를 입력하지 않았습니다.');
    });
  });
});

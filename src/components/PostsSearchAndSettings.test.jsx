import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsSearchAndSettings from './PostsSearchAndSettings';

const resetSearchConditionState = jest.fn();
const resetLookUpConditionState = jest.fn();
const changeExerciseSelection = jest.fn();
const changePlaceSelection = jest.fn();
const changeAuthorSelection = jest.fn();
const changeMemberSelection = jest.fn();
const changeApplicantSelection = jest.fn();
const setRegisteredSelection = jest.fn();
const setWrittenSelection = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  resetSearchConditionState,
  resetLookUpConditionState,
  changeExerciseSelection,
  changePlaceSelection,
  changeAuthorSelection,
  changeMemberSelection,
  changeApplicantSelection,
  setRegisteredSelection,
  setWrittenSelection,
}));

describe('PostSearchAndSettings', () => {
  function renderPostsSearchAndSettings() {
    render((
      <PostsSearchAndSettings />
    ));
  }

  context('게시글 목록 조회 화면 내 게시글 입력 폼 및 검색조건/조회방식 선택 컴포넌트는', () => {
    it('검색어 입력 폼, 검색조건/조회방식 토글 버튼으로 구성됨', () => {
      renderPostsSearchAndSettings();

      screen.getByLabelText('검색어');
      screen.getByPlaceholderText('검색어 입력');
      screen.getByText('검색');
      screen.getByText('검색조건 설정');
      screen.getByText('조회방식 설정');
    });

    it('화면이 처음으로 렌더링될 때 선택되어 있던 검색조건/조회방식 선택 상태를 초기화하는 함수 호출', () => {
      renderPostsSearchAndSettings();

      expect(resetSearchConditionState).toBeCalled();
      expect(resetLookUpConditionState).toBeCalled();
    });

    context('검색조건 설정 토글을 클릭하면', () => {
      it('검색 조건 필터링 토글 버튼들을 확인할 수 있음, '
        + '검색조건 설정 토글을 다시 클릭하면 토글 버튼들을 확인할 수 없음', () => {
        renderPostsSearchAndSettings();

        fireEvent.click(screen.getByText('검색조건 설정'));
        screen.getByText('종목');
        screen.getByText('장소');
        screen.getByText('작성자');
        screen.getByText('참가자');
        screen.getByText('신청자');
        expect(screen.queryByText('내가 참가하는 운동')).toBe(null);
        expect(screen.queryByText('내가 모집하는 운동')).toBe(null);

        fireEvent.click(screen.getByText('검색조건 설정'));
        expect(screen.queryByText('종목')).toBe(null);
        expect(screen.queryByText('장소')).toBe(null);
        expect(screen.queryByText('작성자')).toBe(null);
        expect(screen.queryByText('참가자')).toBe(null);
        expect(screen.queryByText('신청자')).toBe(null);
      });
    });

    context('조회방식 설정 토글을 클릭하면', () => {
      it('게시글 조회 조건 선택 토글 버튼들을 확인할 수 있음, '
        + '조회방식 설정 토글을 다시 클릭하면 토글 버튼들을 확인할 수 없음', () => {
        renderPostsSearchAndSettings();

        fireEvent.click(screen.getByText('조회방식 설정'));
        screen.getByText('내가 참가하는 운동');
        screen.getByText('내가 모집하는 운동');
        expect(screen.queryByText('종목')).toBe(null);
        expect(screen.queryByText('장소')).toBe(null);
        expect(screen.queryByText('작성자')).toBe(null);
        expect(screen.queryByText('참가자')).toBe(null);
        expect(screen.queryByText('신청자')).toBe(null);

        fireEvent.click(screen.getByText('조회방식 설정'));
        expect(screen.queryByText('내가 참가하는 운동')).toBe(null);
        expect(screen.queryByText('내가 모집하는 운동')).toBe(null);
      });
    });

    context('특정 설정 컴포넌트 토글을 클릭했다가 다른 설정 컴포넌트 토글을 클릭하면', () => {
      it('기존에 열려있던 설정 컴포넌트는 사라지고 새로 클릭한 설정 컴포넌트가 출력됨', () => {
        renderPostsSearchAndSettings();

        fireEvent.click(screen.getByText('검색조건 설정'));
        screen.getByText('종목');
        expect(screen.queryByText('내가 참가하는 운동')).toBe(null);

        fireEvent.click(screen.getByText('조회방식 설정'));
        screen.getByText('내가 모집하는 운동');
        expect(screen.queryByText('장소')).toBe(null);

        fireEvent.click(screen.getByText('검색조건 설정'));
        screen.getByText('작성자');
        expect(screen.queryByText('내가 참가하는 운동')).toBe(null);
      });
    });
  });

  context('검색조건 설정 컴포넌트에 존재하는 검색조건 설정 토글 버튼을 클릭하면', () => {
    it('각 토글 버튼을 활성화하는 함수 호출', () => {
      renderPostsSearchAndSettings();

      fireEvent.click(screen.getByText('검색조건 설정'));
      fireEvent.click(screen.getByText('종목'));
      expect(changeExerciseSelection).toBeCalled();
      fireEvent.click(screen.getByText('장소'));
      expect(changePlaceSelection).toBeCalled();
      fireEvent.click(screen.getByText('작성자'));
      expect(changeAuthorSelection).toBeCalled();
      fireEvent.click(screen.getByText('참가자'));
      expect(changeMemberSelection).toBeCalled();
      fireEvent.click(screen.getByText('신청자'));
      expect(changeApplicantSelection).toBeCalled();
    });
  });

  context('조회방식 설정 컴포넌트에 존재하는 조회방식 설정 토글 버튼을 클릭하면', () => {
    it('각 토글 버튼을 활성화하는 함수 호출', () => {
      renderPostsSearchAndSettings();

      fireEvent.click(screen.getByText('조회방식 설정'));
      fireEvent.click(screen.getByText('내가 참가하는 운동'));
      expect(setRegisteredSelection).toBeCalled();
      fireEvent.click(screen.getByText('내가 모집하는 운동'));
      expect(setWrittenSelection).toBeCalled();
    });
  });
});

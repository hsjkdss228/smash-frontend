import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormPage from './PostFormPage';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let gameExercise;
let gameDate;
let gamePlace;
let gameTargetMemberCount;
let postDetail;
let formErrors;
let serverErrors;
const changeGameExercise = jest.fn();
const changeGameDate = jest.fn();
const changeGameStartTimeAmPm = jest.fn();
const changeGameStartHour = jest.fn();
const changeGameStartMinute = jest.fn();
const changeGameEndTimeAmPm = jest.fn();
const changeGameEndHour = jest.fn();
const changeGameEndMinute = jest.fn();
const changeGamePlace = jest.fn();
const changeGameTargetMemberCount = jest.fn();
const changePostDetail = jest.fn();
let createPost;
const clearStates = jest.fn();
jest.mock('../hooks/usePostFormStore', () => () => ({
  gameExercise,
  gameDate,
  gamePlace,
  gameTargetMemberCount,
  postDetail,
  formErrors,
  serverErrors,
  changeGameExercise,
  changeGameDate,
  changeGameStartTimeAmPm,
  changeGameStartHour,
  changeGameStartMinute,
  changeGameEndTimeAmPm,
  changeGameEndHour,
  changeGameEndMinute,
  changeGamePlace,
  changeGameTargetMemberCount,
  changePostDetail,
  createPost,
  clearStates,
}));

describe('PostFormPage', () => {
  // TODO: 게시글 수정 기능을 추가할 때는 fetchPost, fetchGame, fetchMember로
  //   게시글의 내용을 가져오는 동작을 전달하는지 검증해야 함
  //   근데 수정할 때는 참가자 목록이 보여야 하네?

  const renderPostFormPage = () => {
    render((
      <PostFormPage />
    ));
  };

  context('게시글 작성하기 페이지에 접속해 각 입력 폼의 내용을 수정하면', () => {
    beforeEach(() => {
      gameExercise = '';
      gameDate = new Date('2022-11-23T00:00:00.000Z');
      gamePlace = '';
      gameTargetMemberCount = 0;
      postDetail = '';
      formErrors = {};
      serverErrors = {};
    });

    it('입력되는 내용을 상태로 저장하는 Store의 메서드 호출', () => {
      renderPostFormPage();

      fireEvent.change(screen.getByLabelText(/종목/), {
        target: { value: '야구' },
      });
      expect(changeGameExercise).toBeCalledWith('야구');

      fireEvent.change(screen.getByLabelText(/날짜/), {
        target: { value: '2022년 11월 24일' },
      });
      expect(changeGameDate)
        .toBeCalledWith(new Date('2022-11-24T00:00:00.000Z'));

      fireEvent.click(screen.getByLabelText(/시작 오후/));
      expect(changeGameStartTimeAmPm).toBeCalledWith('pm');

      fireEvent.change(screen.getByLabelText(/start hour/), {
        target: { value: '05' },
      });
      expect(changeGameStartHour).toBeCalledWith('05');

      fireEvent.change(screen.getByLabelText(/start minute/), {
        target: { value: '20' },
      });
      expect(changeGameStartMinute).toBeCalledWith('20');

      fireEvent.click(screen.getByLabelText(/종료 오전/));
      expect(changeGameEndTimeAmPm).toBeCalledWith('am');

      fireEvent.change(screen.getByLabelText(/end hour/), {
        target: { value: '12' },
      });
      expect(changeGameEndHour).toBeCalledWith('12');

      fireEvent.change(screen.getByLabelText(/end minute/), {
        target: { value: '30' },
      });
      expect(changeGameEndMinute).toBeCalledWith('30');

      fireEvent.change(screen.getByLabelText(/장소/), {
        target: { value: '고척스카이돔' },
      });
      expect(changeGamePlace).toBeCalledWith('고척스카이돔');

      fireEvent.change(screen.getByLabelText(/모집 인원/), {
        target: { value: 20 },
      });
      expect(changeGameTargetMemberCount).toBeCalledWith('20');

      fireEvent.change(screen.getByLabelText(/상세 내용/), {
        target: { value: '상세 내용' },
      });
      expect(changePostDetail).toBeCalledWith('상세 내용');
    });

    context('작성하기 버튼을 누르면', () => {
      it('게시글 생성 API 요청을 호출하는 Store의 메서드 호출한 뒤, '
        + '생성된 게시글 아이디가 반환되면 '
        + 'Store의 상태를 비우고 게시글 목록 보기 페이지로 navigate', async () => {
        jest.clearAllMocks();
        const createdPostId = 10;
        createPost = jest.fn(() => createdPostId);

        renderPostFormPage();

        fireEvent.click(screen.getByText('작성하기'));
        await waitFor(() => {
          expect(createPost).toBeCalled();
          expect(clearStates).toBeCalled();
          expect(navigate).toBeCalledWith('/posts/list');
        });
      });
    });
  });
});

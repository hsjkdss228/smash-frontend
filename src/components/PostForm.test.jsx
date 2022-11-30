import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostForm from './PostForm';

describe('PostForm', () => {
  const navigateToBackward = jest.fn();
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
  const createPost = jest.fn();

  const renderPostForm = ({
    data,
    formErrors,
    serverErrors,
  }) => {
    render((
      <PostForm
        data={data}
        navigateToBackward={navigateToBackward}
        changeGameExercise={changeGameExercise}
        changeGameDate={changeGameDate}
        changeGameStartTimeAmPm={changeGameStartTimeAmPm}
        changeGameStartHour={changeGameStartHour}
        changeGameStartMinute={changeGameStartMinute}
        changeGameEndTimeAmPm={changeGameEndTimeAmPm}
        changeGameEndHour={changeGameEndHour}
        changeGameEndMinute={changeGameEndMinute}
        changeGamePlace={changeGamePlace}
        changeGameTargetMemberCount={changeGameTargetMemberCount}
        changePostDetail={changePostDetail}
        createPost={createPost}
        formErrors={formErrors}
        serverErrors={serverErrors}
      />
    ));
  };

  context('게시글 작성 페이지로부터 정보가 전달되면', () => {
    const data = {
      gameExercise: '',
      gameDate: new Date(),
      gamePlace: '',
      gameTargetMemberCount: 0,
      postDetail: '',
    };
    const formErrors = {};
    const serverErrors = {};

    it('게시글 작성 폼을 화면에 출력', () => {
      renderPostForm({
        data,
        formErrors,
        serverErrors,
      });

      screen.getByText(/종목/);
      screen.getByText(/날짜/);
      screen.getByText(/시간/);
      screen.getByText(/장소/);
      screen.getByText(/모집 인원/);
      screen.getByText(/상세 내용/);
    });

    context('뒤로가기 버튼을 누르면', () => {
      it('뒤로 가기 핸들러 함수 호출', () => {
        renderPostForm({
          data,
          formErrors,
          serverErrors,
        });

        fireEvent.click(screen.getByText('⬅️'));
        expect(navigateToBackward).toBeCalled();
      });
    });

    context('각 입력 폼에 내용을 입력하면', () => {
      const dataWithSpecificDate = {
        gameExercise: '',
        gameDate: new Date('2022-11-23T00:00:00.000Z'),
        gamePlace: '',
        gameTargetMemberCount: 0,
        postDetail: '',
      };

      it('입력되는 내용을 상태로 저장하는 핸들러 함수 호출', () => {
        renderPostForm({
          data: dataWithSpecificDate,
          formErrors,
          serverErrors,
        });

        fireEvent.change(screen.getByLabelText(/종목/), {
          target: { value: '야구' },
        });
        expect(changeGameExercise).toBeCalledWith('야구');

        fireEvent.change(screen.getByLabelText(/날짜/), {
          target: { value: '2022년 11월 24일' },
        });
        expect(changeGameDate)
          .toBeCalledWith(new Date('2022-11-24T00:00:00.000Z'));

        fireEvent.click(screen.getByLabelText(/시작 오전/));
        expect(changeGameStartTimeAmPm).toBeCalledWith('am');

        fireEvent.change(screen.getByLabelText(/start hour/), {
          target: { value: '05' },
        });
        expect(changeGameStartHour).toBeCalledWith('05');

        fireEvent.change(screen.getByLabelText(/start minute/), {
          target: { value: '20' },
        });
        expect(changeGameStartMinute).toBeCalledWith('20');

        fireEvent.click(screen.getByLabelText(/종료 오후/));
        expect(changeGameEndTimeAmPm).toBeCalledWith('pm');

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
        it('입력되는 내용을 상태로 저장하는 핸들러 함수 호출', () => {
          renderPostForm({
            data,
            formErrors,
            serverErrors,
          });

          fireEvent.click(screen.getByText(/작성하기/));
          expect(createPost).toBeCalled();
        });
      });
    });
  });

  context('게시글 작성 페이지로부터 에러 메세지가 전달되면', () => {
    const data = {
      gameExercise: '',
      gameDate: new Date(),
      gamePlace: '',
      gameTargetMemberCount: 0,
      postDetail: '',
    };
    const formErrors = {
      BLANK_GAME_PLACE: '운동 장소 이름을 입력해주세요.',
      NULL_GAME_TARGET_MEMBER_COUNT: '사용자 수를 입력해주세요.',
    };
    const serverErrors = {};

    it('에러 메세지를 컴포넌트에 출력', () => {
      renderPostForm({
        data,
        formErrors,
        serverErrors,
      });

      screen.getByText('운동 장소 이름을 입력해주세요.');
      screen.getByText('사용자 수를 입력해주세요.');
    });
  });
});

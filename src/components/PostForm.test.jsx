import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostForm from './PostForm';

describe('PostForm', () => {
  const navigateToBackward = jest.fn();
  const changeGameExercise = jest.fn();
  const changeGameDate = jest.fn();
  const changeGameStartHour = jest.fn();
  const changeGameStartMinute = jest.fn();
  const changeGameEndHour = jest.fn();
  const changeGameEndMinute = jest.fn();
  const changeGamePlace = jest.fn();
  const changeGameTargetMemberCount = jest.fn();
  const changePostDetail = jest.fn();
  const createPost = jest.fn();

  const renderPostForm = ({
    data,
  }) => {
    render((
      <PostForm
        data={data}
        navigateToBackward={navigateToBackward}
        changeGameExercise={changeGameExercise}
        changeGameDate={changeGameDate}
        changeGameStartHour={changeGameStartHour}
        changeGameStartMinute={changeGameStartMinute}
        changeGameEndHour={changeGameEndHour}
        changeGameEndMinute={changeGameEndMinute}
        changeGamePlace={changeGamePlace}
        changeGameTargetMemberCount={changeGameTargetMemberCount}
        changePostDetail={changePostDetail}
        createPost={createPost}
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

    it('게시글 작성 폼을 화면에 출력', () => {
      renderPostForm({
        data,
      });

      screen.getByText(/종목/);
      screen.getByText(/날짜/);
      screen.getByText(/시간/);
      screen.getByText(/장소/);
      screen.getByText(/모집할 인원 수/);
      screen.getByText(/상세 내용/);
    });

    context('뒤로가기 버튼을 누르면', () => {
      it('뒤로 가기 핸들러 함수 호출', () => {
        renderPostForm({
          data,
        });

        fireEvent.click(screen.getByText('⬅️'));
        expect(navigateToBackward).toBeCalled();
      });
    });

    context('각 입력 폼에 내용을 입력하면', () => {
      const dataWithSpecificDate = {
        gameExercise: '',
        gameDate: new Date('2022-11-24T00:00:00.000Z'),
        gamePlace: '',
        gameTargetMemberCount: 0,
        postDetail: '',
      };

      it('입력되는 내용을 상태로 저장하는 핸들러 함수 호출', () => {
        renderPostForm({
          data: dataWithSpecificDate,
        });

        fireEvent.change(screen.getByLabelText(/종목/), {
          target: { value: '야구' },
        });
        expect(changeGameExercise).toBeCalledWith('야구');

        fireEvent.change(screen.getByLabelText('날짜를 선택하세요:'), {
          target: { value: '2022년 11월 25일' },
        });
        expect(changeGameDate).toBeCalled();

        fireEvent.change(screen.getByLabelText(/start hour/), {
          target: { value: '05' },
        });
        expect(changeGameStartHour).toBeCalledWith('05');

        fireEvent.change(screen.getByLabelText(/start minute/), {
          target: { value: '05' },
        });
        expect(changeGameStartMinute).toBeCalledWith('05');

        fireEvent.change(screen.getByLabelText(/end hour/), {
          target: { value: '12' },
        });
        expect(changeGameEndHour).toBeCalledWith('12');

        fireEvent.change(screen.getByLabelText(/end minute/), {
          target: { value: '59' },
        });
        expect(changeGameEndMinute).toBeCalledWith('59');

        fireEvent.change(screen.getByLabelText(/장소/), {
          target: { value: '고척스카이돔' },
        });
        expect(changeGamePlace).toBeCalledWith('고척스카이돔');

        fireEvent.change(screen.getByLabelText(/모집할 인원 수/), {
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
          });

          fireEvent.click(screen.getByText(/작성하기/));
          expect(createPost).toBeCalled();
        });
      });
    });
  });
});

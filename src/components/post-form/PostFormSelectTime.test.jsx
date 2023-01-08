import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostFormSelectTime from './PostFormSelectTime';

describe('PostFormSelectTime', () => {
  const onChange = jest.fn();

  function renderPostFormSelectTime({
    id,
    type,
    time,
    value,
  }) {
    render((
      <PostFormSelectTime
        id={id}
        type={type}
        time={time}
        value={value}
        onChange={onChange}
      />
    ));
  }

  context('게시글 입력 폼 중 시간 값 입력 필드는', () => {
    const id = 'input-game-start-minute';
    const type = 'start';
    const time = 'minute';
    const value = '30';

    it('입력 필드 식별을 위한 label과 시간을 입력할 수 있는 입력 필드로 구성됨', () => {
      renderPostFormSelectTime({
        id,
        type,
        time,
        value,
      });

      screen.getByLabelText('start minute');
      screen.getByDisplayValue('30');
    });

    it('입력 필드의 값을 변경하면 입력 필드의 값을 변경하는 핸들러 함수 호출', () => {
      renderPostFormSelectTime({
        id,
        type,
        time,
        value,
      });

      fireEvent.change(screen.getByLabelText('start minute'), {
        target: { value: '9' },
      });
      expect(onChange).toBeCalled();
    });
  });
});

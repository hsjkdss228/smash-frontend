import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import BackwardButton from './BackwardButton';

describe('BackwardButton', () => {
  const handleClick = jest.fn();

  context('버튼을 클릭하면', () => {
    it('prop으로 전달받은 onClick 함수 호출', () => {
      render((
        <BackwardButton
          onClick={handleClick}
        />
      ));

      fireEvent.click(screen.getByAltText('뒤로 가기 아이콘'));
      expect(handleClick).toBeCalled();
    });
  });
});

import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

describe('HomePage', () => {
  context('홈페이지 확인 시', () => {
    it('링크로 이동할 수 있는 메뉴들이 있음', () => {
      render((
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      ));

      screen.getByText('운동 찾기');
      screen.getByText('지도에서 운동 찾기');
      screen.getByText('운동 모집하기');
      screen.getByText('내가 참가하는 운동 보기');
      screen.getByText('내가 모집하는 운동 보기');
    });
  });
});

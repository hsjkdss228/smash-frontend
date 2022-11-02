import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';

import BottomNavigator from './BottomNavigator';

describe('BottomNavigator', () => {
  context('하단 네비게이터 확인 시', () => {
    it('홈, 운동, 클럽, 채팅 버튼 출력', () => {
      render((
        <MemoryRouter>
          <BottomNavigator />
        </MemoryRouter>
      ));

      screen.getByText(/홈/);
      screen.getByText(/운동/);
      screen.getByText(/클럽/);
      screen.getByText(/채팅/);
    });
  });
});

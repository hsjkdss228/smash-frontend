import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  context('헤더 컴포넌트 확인 시', () => {
    it('애플리케이션 이름, 운동 선택하기, 사이드바 메뉴 펼치기 버튼 존재', () => {
      render((
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      ));

      screen.getByText(/SMASH/);
      screen.getByText(/운동 선택하기/);
      screen.getByText(/사이드바 메뉴/);
    });
  });
});

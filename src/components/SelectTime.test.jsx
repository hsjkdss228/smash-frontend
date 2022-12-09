import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import SelectTime from './SelectTime';

describe('SelectTime', () => {
  // const onChange = jest.fn();

  // const renderSelectTime = ({
  //   id,
  //   type,
  //   time,
  // }) => {
  //   render((
  //     <SelectTime
  //       id={id}
  //       onChange={onChange}
  //       type={type}
  //       time={time}
  //     />
  //   ));
  // };

  context('시간 선택 Select 컴포넌트를 불러오면', () => {
    // const id = 'input-game-start-hour';
    // const type = 'start';
    // const time = 'hour';

    it('1~12까지 있는 option 태그를 출력', () => {
    //   renderSelectTime({
    //     id,
    //     type,
    //     time,
    //   });

    //   screen.getByText(/start hour/);
    //   Array(12).fill(0).forEach((_, index) => {
    //     const value = index + 1 < 10
    //       ? `0${index + 1}`
    //       : (index + 1).toString();
    //     screen.getByText(value);
    //   });
    });
  });

  // context('분 선택 Select 컴포넌트를 불러오면', () => {
  //   const id = 'input-game-end-hour';
  //   const type = 'end';
  //   const time = 'minute';

  //   it('00, 10, 20, 30, 40, 50까지 있는 option 태그를 출력', () => {
  //     renderSelectTime({
  //       id,
  //       type,
  //       time,
  //     });

  //     screen.getByText(/end minute/);
  //     Array(6).fill(0).forEach((_, index) => {
  //       const value = index === 0
  //         ? '00'
  //         : (index * 10).toString();
  //       screen.getByText(value);
  //     });
  //   });
  // });
});

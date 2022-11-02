import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  position: fixed;
  top: 0;
  height: 4em;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 4fr;
  gap: 50%;
`;

const Title = styled.h1`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Side = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function Header() {
  const navigate = useNavigate();

  const handleClickChangeExercise = () => {
    navigate('/exercise');
  };

  const handleClickSidebarMenu = () => {
    // TODO: 사이드바 메뉴 출력 (같은 화면에서 출력되도록 하는 방법 고려해야...)
    //  아마 여기 헤더에서 사이드바 컴포넌트를 상황에 따라 출력하도록 하면 될 것 같긴 함
    //  생성될 때 이펙트를 줄 수 있는 방법이 있을까? (화면 우측에서 사악 나타나도록)
  };

  return (
    <Container>
      <Title>SMASH</Title>
      <Side>
        <button
          type="button"
          onClick={handleClickChangeExercise}
        >
          운동 선택하기
        </button>
        <button
          type="button"
          onClick={handleClickSidebarMenu}
        >
          사이드바 메뉴
        </button>
      </Side>
    </Container>
  );
}

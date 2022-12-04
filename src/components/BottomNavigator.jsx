import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 1px solid #000;
  background-color: #FFF;
`;

export default function BottomNavigator() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickButton = (link) => {
    navigate(link, {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  return (
    <Container>
      <button
        type="button"
        onClick={() => handleClickButton('/')}
      >
        홈
      </button>
      <button
        type="button"
        onClick={() => handleClickButton('/write')}
      >
        글쓰기
      </button>
      <button
        type="button"
        onClick={() => handleClickButton('/chat')}
      >
        채팅
      </button>
    </Container>
  );
}

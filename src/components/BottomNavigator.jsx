import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  height: 4em;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function BottomNavigator() {
  const navigate = useNavigate();

  const handleClickButton = (link) => {
    navigate(link);
  };

  return (
    <Container>
      <button
        type="button"
        onClick={() => handleClickButton('/home')}
      >
        홈
      </button>
      <button
        type="button"
        onClick={() => handleClickButton('/posts')}
      >
        운동
      </button>
      <button
        type="button"
        onClick={() => handleClickButton('/club')}
      >
        클럽
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

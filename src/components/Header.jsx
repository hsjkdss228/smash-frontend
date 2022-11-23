import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.header`
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 4fr;
  gap: 50%;
  border-bottom: 1px solid black;
  background-color: #FFF;
`;

const Title = styled.h1`
  font-size: 1.5em;
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

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>SMASH</Title>
      <Side>
        {accessToken ? (
          <button
            type="button"
            onClick={handleClickLogout}
          >
            로그아웃
          </button>
        ) : (
          <button
            type="button"
            onClick={navigateToLoginPage}
          >
            LOGIN
          </button>
        )}
      </Side>
    </Container>
  );
}

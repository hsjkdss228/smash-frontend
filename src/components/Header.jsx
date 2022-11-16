import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import { postApiService } from '../services/PostApiService';

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

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const { userId } = userStore;

  const handleChangeUserId = (event) => {
    const value = Number(event.target.value);
    userStore.changeUserId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verifiedAccessToken = await userStore.login();
    if (verifiedAccessToken) {
      setAccessToken(verifiedAccessToken);
      postApiService.setAccessToken(verifiedAccessToken);
      userStore.changeUserId('');
    }
  };

  const handleClickLogout = () => {
    setAccessToken('');
    postApiService.setAccessToken('');
    navigate('/');
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="userId">User Id:</label>
            <input
              id="userId"
              value={userId}
              onChange={(event) => handleChangeUserId(event)}
            />
            <button
              type="submit"
            >
              로그인
            </button>
          </form>
        )}
      </Side>
    </Container>
  );
}

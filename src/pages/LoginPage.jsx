import { useLocation, useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const navigateBackward = () => {
    navigate(previousPath || '/');
  };

  const navigateSignUp = () => {
    navigate('/signup', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  return (
    <LoginForm
      navigateBackward={navigateBackward}
      navigateSignUp={navigateSignUp}
    />
  );
}

// TODO: AccessToken 관련 오류가 발생할 경우 이 구문을 적용시켜보기
// jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
// Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

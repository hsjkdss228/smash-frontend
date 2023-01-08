import { useLocation, useNavigate } from 'react-router-dom';

import LoginForm from '../components/login/LoginForm';

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

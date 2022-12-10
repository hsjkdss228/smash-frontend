import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useUserStore from '../hooks/useUserStore';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const clearLoginError = () => {
    userStore.clearLoginError();
  };

  useEffect(() => {
    userStore.clearLoginError();
  }, []);

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

  const {
    register, handleSubmit, formState: { errors }, clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });

  const login = async (data) => {
    const { username, password } = data;
    const verifiedAccessToken = await userStore.login({ username, password });
    if (verifiedAccessToken) {
      setAccessToken(verifiedAccessToken);
      navigate(-1);
    }
  };

  const { loginServerError } = userStore;

  return (
    <LoginForm
      onClickBackward={navigateBackward}
      onClickSignUp={navigateSignUp}
      register={register}
      handleSubmit={handleSubmit}
      clearErrors={clearErrors}
      clearServerError={clearLoginError}
      login={login}
      loginFormError={errors}
      loginServerError={loginServerError}
    />
  );
}

import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useUserStore from '../hooks/useUserStore';
import LoginForm from '../components/LoginForm';
import LoginErrors from '../components/LoginErrors';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    userStore.clearLoginError();
  }, []);

  const navigateBackward = () => {
    navigate(previousPath || '/');
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const login = async (data) => {
    const { username, password } = data;
    const verifiedAccessToken = await userStore.login({ username, password });
    if (verifiedAccessToken) {
      setAccessToken(verifiedAccessToken);
      navigate(-1);
    }
  };

  const { loginErrorMessage } = userStore;

  return (
    <>
      <LoginForm
        onClickBackward={navigateBackward}
        register={register}
        handleSubmit={handleSubmit}
        login={login}
      />
      <LoginErrors
        loginFormError={errors}
        loginProcessError={loginErrorMessage}
      />
    </>
  );
}

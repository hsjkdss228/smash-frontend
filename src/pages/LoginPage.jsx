import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useUserStore from '../hooks/useUserStore';
import LoginForm from '../components/LoginForm';
import LoginErrors from '../components/LoginErrors';

export default function LoginPage() {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    userStore.clearLoginError();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const login = async (data) => {
    const { username, password } = data;
    const verifiedAccessToken = await userStore.login({ username, password });
    if (verifiedAccessToken) {
      setAccessToken(verifiedAccessToken);
      navigate('/');
    }
  };

  const { loginErrorMessage } = userStore;

  return (
    <>
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        login={login}
        loginFormError={errors}
        loginProcessError={loginErrorMessage}
      />
      <LoginErrors
        loginFormError={errors}
        loginProcessError={loginErrorMessage}
      />
    </>
  );
}

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const clearSignUpError = () => {
    userStore.clearSignUpError();
  };

  useEffect(() => {
    clearSignUpError();
  }, []);

  const navigateBackward = () => {
    navigate(previousPath || '/');
  };

  const {
    register, handleSubmit, formState: { errors }, clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });

  const signUp = async (data) => {
    const {
      name,
      username,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    } = data;
    const enrolledName = await userStore.signUp({
      name,
      username,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    });
    if (enrolledName) {
      const verifiedAccessToken = await userStore.login({ username, password });
      if (verifiedAccessToken) {
        setAccessToken(verifiedAccessToken);
        navigate('/welcome', {
          state: {
            enrolledName,
          },
        });
      }
    }
  };

  const { signUpServerError } = userStore;

  return (
    <SignUpForm
      onClickBackward={navigateBackward}
      register={register}
      handleSubmit={handleSubmit}
      clearErrors={clearErrors}
      clearServerError={clearSignUpError}
      signUp={signUp}
      formError={errors}
      serverError={signUpServerError}
    />
  );
}

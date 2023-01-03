import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import PostForm from '../components/PostForm';

export default function PostFormPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateBackward = () => {
    navigate(previousPath || '/');
  };

  const navigatePostsAfterCreated = async () => {
    navigate('/posts/list', {
      state: {
        postStatus: 'created',
      },
    });
  };

  useEffect(() => {
    if (!loggedIn) {
      navigateLogin();
    }
  }, []);

  return (
    <PostForm
      navigateBackward={navigateBackward}
      navigatePostsAfterCreated={navigatePostsAfterCreated}
    />
  );
}

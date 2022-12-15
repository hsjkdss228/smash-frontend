import { useLocation, useNavigate } from 'react-router-dom';

import PostForm from '../components/PostForm';

export default function PostFormPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state !== null
    ? location.state.previousPath
    : null;

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

  return (
    <PostForm
      navigateBackward={navigateBackward}
      navigatePostsAfterCreated={navigatePostsAfterCreated}
    />
  );
}

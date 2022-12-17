import { useLocation, useNavigate } from 'react-router-dom';

import Post from '../components/Post';

export default function PostPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.state !== null
    ? location.state.postId
    : Number(location.pathname.split('/')[2]);

  const navigateBackward = () => {
    navigate('/posts/list');
  };

  const navigateLogin = () => {
    navigate('/login', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  // TODO: 체험 계정 선택하기 페이지로 이동시키기

  const navigateSelectTrialAccount = () => {
    navigate('/login', {
      state: {
        previousPath: location.pathname,
      },
    });
  };

  const navigatePostsAfterDeleted = () => {
    navigate('/posts/list', {
      state: {
        postStatus: 'deleted',
      },
    });
  };

  return (
    <Post
      postId={postId}
      navigateBackward={navigateBackward}
      navigateLogin={navigateLogin}
      navigateSelectTrialAccount={navigateSelectTrialAccount}
      navigatePostsAfterDeleted={navigatePostsAfterDeleted}
    />
  );
}

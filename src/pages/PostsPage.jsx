import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../hooks/usePostStore';

import Posts from '../components/Posts';

export default function PostsPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, [accessToken]);

  const { posts, postsErrorMessage } = postStore;

  const navigateToBackward = () => {
    navigate(-1);
  };

  const navigateToPost = (postId) => {
    navigate(`/posts/${postId}`, {
      state: {
        postId,
      },
    });
  };

  return (
    <Posts
      posts={posts}
      navigateToBackward={navigateToBackward}
      navigateToPost={navigateToPost}
      postsErrorMessage={postsErrorMessage}
    />
  );
}

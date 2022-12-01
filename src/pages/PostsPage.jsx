import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../hooks/usePostStore';

import Posts from '../components/Posts';
import { postApiService } from '../services/PostApiService';

export default function PostsPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const [searchSetting, toggleSearchSetting] = useState(false);
  const [filterSetting, toggleFilterSetting] = useState(false);

  const postStore = usePostStore();

  useEffect(() => {
    postApiService.setAccessToken(accessToken);
    postStore.fetchPosts();
  }, [accessToken]);

  const {
    posts,
    postsErrorMessage,
  } = postStore;

  const handleClickToggleSearchSetting = () => {
    toggleSearchSetting(!searchSetting);
    toggleFilterSetting(false);
  };

  const handleClickToggleFilterSetting = () => {
    toggleSearchSetting(false);
    toggleFilterSetting(!filterSetting);
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
      loggedIn={loggedIn}
      searchSetting={searchSetting}
      filterSetting={filterSetting}
      toggleSearchSetting={handleClickToggleSearchSetting}
      toggleFilterSetting={handleClickToggleFilterSetting}
      posts={posts}
      navigateToPost={navigateToPost}
      postsErrorMessage={postsErrorMessage}
    />
  );
}

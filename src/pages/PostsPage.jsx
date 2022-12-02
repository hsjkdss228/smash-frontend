import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import usePostStore from '../hooks/usePostStore';

import Posts from '../components/Posts';
import { postApiService } from '../services/PostApiService';
import ModalConfirm from '../components/ModalConfirm';

export default function PostsPage() {
  const [actionMessage, setActionMessage] = useState('');
  const [confirmModalState, setConfirmModalState] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const postStatus = !location.state
    ? null
    : location.state.postStatus;

  const [accessToken] = useLocalStorage('accessToken', '');
  const loggedIn = accessToken !== '';

  const [searchSetting, toggleSearchSetting] = useState(false);
  const [filterSetting, toggleFilterSetting] = useState(false);

  const postStore = usePostStore();

  const seeConfirmModal = ({ message }) => {
    setActionMessage(message);
    setConfirmModalState(true);
  };

  useEffect(() => {
    if (postStatus) {
      seeConfirmModal({
        message: postStatus === 'created'
          ? '게시글 작성이'
          : '게시글 삭제가',
      });
    }
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
    <>
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
      {confirmModalState && (
        <ModalConfirm
          actionMessage={actionMessage}
          confirmModalState={confirmModalState}
          setConfirmModalState={setConfirmModalState}
        />
      )}
    </>
  );
}

import { useEffect } from 'react';
import PostsList from '../components/PostsList';
import usePostStore from '../hooks/usePostStore';

export default function PostsListPage() {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  // TODO: 게시글 클릭 시 게시글 상세 페이지로 링크 연결

  return (
    <PostsList
      posts={posts}
    />
  );
}

import { useEffect } from 'react';
import PostList from '../components/PostList';
import usePostStore from '../hooks/usePostStore';

export default function PostListPage() {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  // TODO: 게시글 클릭 시 게시글 상세 페이지로 링크 연결

  return (
    <PostList
      posts={posts}
    />
  );
}

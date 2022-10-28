import { useEffect } from 'react';
import PostsList from '../components/PostsList';
import usePostStore from '../hooks/usePostStore';

export default function PostsListPage() {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  return (
    <PostsList
      posts={posts}
    />
  );
}

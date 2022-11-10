import { useEffect } from 'react';
import Posts from '../components/Posts';
import usePostStore from '../hooks/usePostStore';

export default function PostsPage() {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
    postStore.fetchImages();
    postStore.fetchGames();
    postStore.fetchPlaces();
    postStore.fetchRoles();
  }, []);

  const {
    posts, images, games, places, roles,
  } = postStore;

  // TODO: 게시글 클릭 시 게시글 상세 페이지로 링크 연결

  return (
    <Posts
      posts={posts}
      images={images}
      games={games}
      places={places}
      roles={roles}
    />
  );
}

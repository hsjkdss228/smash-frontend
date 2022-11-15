import Post from '../components/Post';

export default function PostPage() {
  const post = {};
  const game = {};
  const members = [];

  return (
    <Post
      post={post}
      game={game}
      members={members}
    />
  );
}

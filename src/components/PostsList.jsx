export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <p>
            {post.detail}
          </p>
          <p>
            참가인원:
            {' '}
            {post.participants.length}
            명
          </p>
        </li>
      ))}
    </ul>
  );
}

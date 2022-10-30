export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <p>
            {post.author}
          </p>
          <p>
            {post.detail}
          </p>
          <p>
            {post.membersCount}
            명/
            {post.targetMembersCount}
            명
          </p>
          {post.positions.map((position) => (
            <p key={position.id}>
              {position.name}
              (
              {position.currentParticipants}
              /
              {position.targetParticipantsCount}
              )
            </p>
          ))}
        </li>
      ))}
    </ul>
  );
}

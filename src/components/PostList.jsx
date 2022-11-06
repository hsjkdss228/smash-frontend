import styled from 'styled-components';

const Container = styled.ul`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Post = styled.li`
  margin-block: 3em;
`;

export default function PostList({ posts }) {
  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id}>
          <button
            type="button"
          >
            <p>{post.game.exerciseDate}</p>
            <p>
              {post.images.find((image) => (
                image.isThumbnailImage
              )).url}
            </p>
            <p>{post.game.place}</p>
            <p>{post.author}</p>
            {post.game.teams.map((team) => (
              <div key={team.id}>
                <p>
                  {team.name}
                  (
                  {team.membersCount}
                  명/
                  {team.targetMembersCount}
                  명)
                </p>
                {team.roles.map((role) => (
                  <p key={role.id}>
                    {role.name}
                  </p>
                ))}
              </div>
            ))}
            <p>{post.game.exercise}</p>
            <p>{`조회수: ${post.hits}회`}</p>
            <p>{post.game.exerciseType}</p>
            <p>{post.game.exerciseLevel}</p>
          </button>
        </Post>
      ))}
    </Container>
  );
}

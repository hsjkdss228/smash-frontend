import styled from 'styled-components';

const Container = styled.ul`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumbnail = styled.ul`
  margin-block: 3em;
`;

// TODO: 작성자 옆에 매너 점수 필드 추가 필요

export default function Posts({
  posts, images, games, places, roles,
}) {
  if (!posts) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <Container>
      {!posts ? (
        <p>
          등록된 게시물이 존재하지 않습니다.
        </p>
      ) : (
        <ul>
          {posts.map((post) => {
            const foundImage = images.find((image) => image.postId === post.id);
            const foundGame = games.find((game) => game.postId === post.id);
            const foundPlace = places.find((place) => place.gameId === foundGame.id);
            const foundRoles = roles.filter((role) => role.gameId === foundGame.id);

            return (
              <Thumbnail key={post.id}>
                <div>
                  <p>{foundGame.date}</p>
                </div>
                <div>
                  <div>
                    <img
                      src={foundImage.url}
                      alt={foundImage.id}
                    />
                  </div>
                  <div>
                    <p>{foundPlace.name}</p>
                    <p>{post.author}</p>
                    <p>
                      총 인원:
                      {foundGame.membersCount}
                      /
                      {foundGame.targetMembersCount}
                      명
                    </p>
                    {foundRoles.map((role) => (
                      <p key={role.id}>
                        {role.name}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p>{foundGame.exercise}</p>
                    <p>{post.hits}</p>
                    <p>{foundGame.type}</p>
                    <p>{foundGame.level}</p>
                  </div>
                </div>
              </Thumbnail>
            );
          })}
        </ul>
      )}
    </Container>
  );
}

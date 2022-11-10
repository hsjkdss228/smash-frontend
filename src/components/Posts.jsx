import styled from 'styled-components';

const Container = styled.article`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumbnails = styled.ul`
  
`;

const Thumbnail = styled.li`
  margin-block: 3em;
`;

// TODO: 작성자 옆에 매너 점수 필드 추가 필요

export default function Posts({ posts }) {
  if (!posts) {
    return (
      <p>등록된 게시물이 존재하지 않습니다.</p>
    );
  }

  return (
    <Container>
      <Thumbnails>
        {posts.map((post) => (
          <Thumbnail key={post.id}>
            <p>
              조회수:
              {' '}
              {post.hits}
            </p>
            <p>{post.game.type}</p>
            <p>{post.game.date}</p>
            <p>{post.game.place}</p>
            <p>
              {post.game.currentMemberCount}
              /
              {post.game.targetMemberCount}
              명
            </p>
          </Thumbnail>
        ))}
      </Thumbnails>
    </Container>
  );
}

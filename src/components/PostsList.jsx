import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';

const Container = styled.ul`
  margin-inline: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Post = styled.li`
  margin-block: 3em;
`;

export default function PostsList({ posts }) {
  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id}>
          <p>{post.exerciseDate}</p>
          <p>{post.thumbnailImageUrl}</p>
          <p>{post.place}</p>
          <p>{post.author}</p>
          <p>{`평균 매너점수: ${post.averageMannerScore}점`}</p>
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
          <p>{`조회수: ${post.hits}회`}</p>
          <p>{post.exercise}</p>
          <p>{post.postType}</p>
          <p>{post.exerciseType}</p>
          <p>{post.exerciseLevel}</p>
          <p>{post.exerciseGender}</p>
          <p>{`참가비: ${numberFormat(post.cost)}원`}</p>
        </Post>
      ))}
    </Container>
  );
}

import styled from 'styled-components';
import usePostStore from '../hooks/usePostStore';

const Container = styled.section`
`;

const ImageList = styled.ul`
  display: flex;
  flex-direction: row;
  overflow: scroll;

  li {
    height: 8em;
    width: 10em;
    margin-right: .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default function PostImages() {
  const postStore = usePostStore();

  const { post } = postStore;

  if (post.imageUrls.length === 0) {
    return (
      null
    );
  }

  return (
    <Container>
      <ImageList>
        {post.imageUrls.map((imageUrl, index) => (
          <li key={`등록된 이미지 ${index + 1}`}>
            <Image
              src={imageUrl}
              alt={`등록된 이미지 ${index + 1}`}
            />
          </li>
        ))}
      </ImageList>
    </Container>
  );
}

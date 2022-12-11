import styled from 'styled-components';

import temporaryImageUrl from './assets/images/TemporaryImage.png';

const Container = styled.section`
`;

const ImageList = styled.ul`
  display: flex;
  flex-direction: row;
  overflow: scroll;

  li {
    height: 8em;
    width: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
  }
`;

const Image = styled.img`
  width: 3em;
`;

export default function PostImages({
  imageUrls,
}) {
  if (imageUrls.length === 0) {
    return (
      null
    );
  }

  return (
    <Container>
      <ImageList>
        {/* TODO: 같은 url의 이미지 여러 개가 전달될 가능성이 있는가? */}
        {imageUrls.map((imageUrl, index) => (
          <li key={imageUrl}>
            <Image
              src={imageUrl}
              alt={`등록한 이미지 ${index + 1}`}
            />
          </li>
        ))}
      </ImageList>
    </Container>
  );
}

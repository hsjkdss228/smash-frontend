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

export default function PostImages() {
  return (
    <Container>
      {/* TODO: 데이터로 이미지를 받아오게 하기 */}
      <ImageList>
        <li>
          <Image
            src={temporaryImageUrl}
            alt="등록한 이미지"
          />
        </li>
      </ImageList>
    </Container>
  );
}

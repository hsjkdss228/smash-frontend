import Container from './ui/ComponentScreenContainer';

export default function Welcome({
  name,
  navigate,
}) {
  return (
    <Container>
      <p>
        {name}
        {' '}
        님, 반갑습니다.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
      >
        홈으로
      </button>
      <button
        type="button"
        onClick={() => navigate('/write')}
      >
        글 쓰러 가기
      </button>
    </Container>
  );
}

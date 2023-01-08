import PostAuthor from './PostAuthor';
import PostDetail from './PostDetail';
import PostImages from './PostImages';

import ComponentSectionContainer from '../ui/ComponentSectionContainer';

export default function PostContent() {
  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <PostAuthor />
      <PostDetail />
      <PostImages />
    </ComponentSectionContainer>
  );
}

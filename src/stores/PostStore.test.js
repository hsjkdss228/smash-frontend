import context from 'jest-plugin-context';
import PostStore from './PostStore';

import { postApiService } from '../services/PostApiService';

let postStore;

describe('PostStore', () => {
  let spyResetSearchConditionState;
  let spyResetLookUpConditionState;

  beforeEach(() => {
    postStore = new PostStore();
    spyResetSearchConditionState = jest.spyOn(postStore, 'resetSearchConditionState');
    spyResetLookUpConditionState = jest.spyOn(postStore, 'resetLookUpConditionState');

    jest.clearAllMocks();
  });

  context('게시글 목록 조회 페이지에 접속했을 때', () => {
    context('검색 조건 설정 상태를 초기화하면', () => {
      beforeEach(() => {
        postStore.exerciseSelection = true;
        postStore.placeSelection = true;
        postStore.authorSelection = true;
        postStore.memberSelection = true;
        postStore.applicantSelection = true;
      });

      it('모든 검색 조건 상태를 비활성화', () => {
        postStore.resetSearchConditionState();

        expect(postStore.exerciseSelection).toBeFalsy();
        expect(postStore.placeSelection).toBeFalsy();
        expect(postStore.authorSelection).toBeFalsy();
        expect(postStore.memberSelection).toBeFalsy();
        expect(postStore.applicationSelection).toBeFalsy();
      });
    });

    context('조회 방식 설정 상태를 초기화하면', () => {
      beforeEach(() => {
        postStore.registeredSelection = true;
        postStore.writtenSelection = false;
      });

      it('모든 조회 방식 설정 상태를 비활성화', () => {
        postStore.resetLookUpConditionState();

        expect(postStore.registeredSelection).toBeFalsy();
        expect(postStore.writtenSelection).toBeFalsy();
      });
    });
  });

  context('검색 조건을 변경하는 경우', () => {
    beforeEach(() => {
      postStore.exerciseSelection = false;
      postStore.placeSelection = false;
      postStore.authorSelection = false;
      postStore.memberSelection = false;
      postStore.applicantSelection = false;
    });

    it('각 검색 조건의 설정 상태를 반전, 조회 방식 설정 상태는 모두 비활성화', () => {
      expect(postStore.exerciseSelection).toBeFalsy();
      postStore.changeExerciseSelection();
      expect(postStore.exerciseSelection).toBeTruthy();
      expect(spyResetLookUpConditionState).toBeCalled();
      jest.clearAllMocks();
      postStore.changeExerciseSelection();
      expect(postStore.exerciseSelection).toBeFalsy();

      jest.clearAllMocks();
      expect(postStore.placeSelection).toBeFalsy();
      postStore.changePlaceSelection();
      expect(postStore.placeSelection).toBeTruthy();
      expect(spyResetLookUpConditionState).toBeCalled();

      jest.clearAllMocks();
      expect(postStore.authorSelection).toBeFalsy();
      postStore.changeAuthorSelection();
      expect(postStore.authorSelection).toBeTruthy();
      expect(spyResetLookUpConditionState).toBeCalled();

      jest.clearAllMocks();
      expect(postStore.memberSelection).toBeFalsy();
      postStore.changeMemberSelection();
      expect(postStore.memberSelection).toBeTruthy();
      expect(spyResetLookUpConditionState).toBeCalled();

      jest.clearAllMocks();
      expect(postStore.applicantSelection).toBeFalsy();
      postStore.changeApplicantSelection();
      expect(postStore.applicantSelection).toBeTruthy();
      expect(spyResetLookUpConditionState).toBeCalled();
    });
  });

  context('조회 방식을 변경하는 경우', () => {
    beforeEach(() => {
      postStore.registeredSelection = false;
      postStore.writtenSelection = false;
    });

    it('선택한 조회 방식의 설정 상태를 반전시키고 다른 조회 방식 설정 상태는 비활성화, '
      + '검색 조건 설정 상태는 모두 비활성화', () => {
      expect(postStore.registeredSelection).toBeFalsy();
      postStore.setRegisteredSelection();
      expect(postStore.registeredSelection).toBeTruthy();
      expect(spyResetSearchConditionState).toBeCalled();
      jest.clearAllMocks();
      postStore.setRegisteredSelection();
      expect(postStore.registeredSelection).toBeFalsy();

      jest.clearAllMocks();
      expect(postStore.writtenSelection).toBeFalsy();
      postStore.setWrittenSelection();
      expect(postStore.writtenSelection).toBeTruthy();
      expect(spyResetSearchConditionState).toBeCalled();
    });
  });

  context('서버에 게시글 목록 데이터를 요청하는 API를 호출하면', () => {
    beforeEach(() => {
      postApiService.setAccessToken('userId 1');
    });

    context('정상적으로 게시글 목록 데이터를 가져온 경우', () => {
      it('서버에서 응답으로 전달된 게시글 목록을 상태로 저장', async () => {
        await postStore.fetchPosts();

        const { posts, postsServerError } = postStore;

        expect(posts.length).toBe(2);
        expect(Object.keys(posts[0]).length).toBe(6);
        expect(Object.keys(posts[1].game).length).toBe(7);
        expect(Object.keys(posts[1].place).length).toBe(1);
        expect(postsServerError).toBeFalsy();
      });
    });

    context('접속한 사용자 정보를 찾을 수 없는 경우', () => {
      beforeEach(() => {
        postApiService.setAccessToken('userId 4 where UserNotFound error occurs');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.fetchPosts();

        const { posts, postsServerError } = postStore;

        expect(posts).toStrictEqual([]);
        expect(postsServerError).toBe('사용자를 찾을 수 없습니다.');
      });
    });

    context('특정 게시물에 연결된 경기 정보를 찾을 수 없는 경우', () => {
      beforeEach(() => {
        postApiService.setAccessToken('userId 10 where GameNotFound error occurs');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.fetchPosts();

        const { posts, postsServerError } = postStore;

        expect(posts).toStrictEqual([]);
        expect(postsServerError).toBe('경기를 찾을 수 없습니다.');
      });
    });

    context('특정 경기에 연결된 운동 장소 정보를 찾을 수 없는 경우', () => {
      beforeEach(() => {
        postApiService.setAccessToken('userId 99 where PlaceNotFound error occurs');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.fetchPosts();

        const { posts, postsServerError } = postStore;

        expect(posts).toStrictEqual([]);
        expect(postsServerError).toBe('운동 장소를 찾을 수 없습니다.');
      });
    });
  });

  context('서버에 특정 게시글의 상세 정보 데이터를 요청하는 API를 호출하면', () => {
    beforeEach(() => {
      postApiService.setAccessToken('userId 1');
    });

    const postId = 1;

    context('정상적으로 게시글 상세 정보를 가져온 경우', () => {
      it('서버에서 응답으로 전달된 게시글의 상세 정보를 상태로 저장', async () => {
        await postStore.fetchPost(postId);

        const { post, postServerError } = postStore;

        expect(Object.keys(post).length).toBe(6);
        expect(Object.keys(post.authorInformation).length).toBe(6);
        expect(postServerError).toBeFalsy();
      });
    });

    context('게시글 정보를 찾을 수 없는 경우', () => {
      const wrongPostId = 9999;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.fetchPost(wrongPostId);

        const { post, postServerError } = postStore;

        expect(Object.keys(post).length).toBe(0);
        expect(postServerError).toBe('게시글을 찾을 수 없습니다.');
      });
    });

    context('접속한 사용자 정보를 찾을 수 없거나, 게시글의 작성자 정보를 찾을 수 없는 경우', () => {
      beforeEach(() => {
        postApiService.setAccessToken('userId 22 where UserNotFound error occurs');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.fetchPost(postId);

        const { post, postServerError } = postStore;

        expect(Object.keys(post).length).toBe(0);
        expect(postServerError).toBe('사용자를 찾을 수 없습니다.');
      });
    });
  });

  context('서버에 특정 게시글의 삭제를 요청하는 API를 호출하면', () => {
    beforeEach(() => {
      postApiService.setAccessToken('userId 1');
    });

    const postId = 1;

    context('정상적인 요청이 이루어졌을 경우', () => {
      it('삭제 요청을 수행', async () => {
        await postStore.deletePost(postId);

        expect(postStore.deletePostServerError).toBeFalsy();
      });
    });

    context('게시글 정보를 찾을 수 없는 경우', () => {
      const wrongPostId = 9999;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.deletePost(wrongPostId);

        expect(postStore.deletePostServerError).toBe('게시글을 찾을 수 없습니다.');
      });
    });

    context('접속한 사용자가 작성자가 아닌 경우', () => {
      beforeEach(() => {
        postApiService.setAccessToken('another userId 122');
      });

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.deletePost(postId);

        expect(postStore.deletePostServerError).toBe('접속한 사용자가 작성자가 아닙니다.');
      });
    });

    context('게시글에 연결된 게임 정보를 찾을 수 없는 경우', () => {
      const postIdWhereGameNotFound = 7876;

      it('서버에서 응답으로 전달된 에러 메시지를 상태로 저장', async () => {
        await postStore.deletePost(postIdWhereGameNotFound);

        expect(postStore.deletePostServerError).toBe('경기를 찾을 수 없습니다.');
      });
    });
  });
});

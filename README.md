# Gyu's Blog ✨

# 📘 기능 소개

- Velog 게시글 데이터 가져오기
  - 제목, 내용, 썸네일, 좋아요, 댓글, 태그
  - velog의 RSS(Rich Site Summary)를 파싱하여 데이터 가져오기
  - velog서버에 graphql fetch 요청을 보내 RSS에 없는 좋아요, 댓글, 태그 데이터 가져오기
  - 게시글 조회수 가져오기(쿠키 헤더 추가)
- github API를 활용하여 커밋 로그 페이지 구현
  - 최근 일주일간 커밋 여부 체크
  - 커밋 레포, 커밋 메세지, 커밋날짜 가져오기
  - 오늘의 커밋 개수, 일주일 간의 커밋 개수 가져오기
- about 페이지 - 프로필 및 간략한 프로젝트 소개
  - 마우스 애니메이션 적용

# 🔥 TBD
- 홈화면에 스크롤 이벤트 적용(애니메이션 or three.js)
- 다크모드 구현
- 게시글 정렬 기능(시간순, 좋아요순, 댓글순)
- pagination(무한스크롤 or 페이지(ISR 적용))
- post 일부만 가져오기(근데 ssg하면 빌드타임에 하나의 페이지가 생성되는데 필요할까에 대한 고민 -> next 14에서 SSG + revalidate 안되는 이슈를 SSR과 일부렌더링으로 해결? 고민)

# 🛠️ Teck Stack
- Nextjs
- Typescript

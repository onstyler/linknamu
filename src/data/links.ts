// 보여주기용 더미 데이터 — 실제 내용은 나중에 교체
// id는 클릭 수를 저장하는 키이므로 한 번 정하면 바꾸지 않는다
export const links = [
  { id: "github", title: "🐙 깃허브", url: "https://github.com/onstyler" },
  { id: "blog", title: "📝 블로그", url: "https://naver.com/" },
  { id: "email", title: "✉️ 이메일", url: "mailto:test@test.com" },
];

export type Link = (typeof links)[number];

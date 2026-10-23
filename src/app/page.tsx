import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";

// 보여주기용 더미 데이터 — 실제 내용은 나중에 교체
const profile = {
  name: "김계별",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요.",
  imageUrl: "https://placehold.co/300x300/orange/white/png",
};

const links = [
  { title: "🐙 깃허브", url: "https://github.com/onstyler" },
  { title: "📝 블로그", url: "https://naver.com/" },
  { title: "✉️ 이메일", url: "mailto:test@test.com" },
];

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 py-16 sm:py-24">
      {/* 글래스 카드 뒤로 비치는 은은한 빛 번짐 (장식용) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20" />
        <div className="absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-900/20" />
      </div>
      <Profile {...profile} />
      <ul className="mt-12 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.title}>
            <LinkCard {...link} />
          </li>
        ))}
      </ul>
    </main>
  );
}

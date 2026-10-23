import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";

// 보여주기용 더미 데이터 — 실제 내용은 나중에 교체
const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile-placeholder.svg",
};

const links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "LinkedIn", url: "https://www.linkedin.com" },
  { title: "Blog", url: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 py-12">
      <Profile {...profile} />
      <ul className="mt-8 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.title}>
            <LinkCard {...link} />
          </li>
        ))}
      </ul>
    </main>
  );
}

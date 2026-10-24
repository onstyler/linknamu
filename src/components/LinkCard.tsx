type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-4 text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_24px_-10px_rgba(140,80,40,0.2)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(140,80,40,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
    >
      {title}
      {/* 제목은 가운데 그대로 두고, 클릭 수만 오른쪽 끝에 작게 */}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}

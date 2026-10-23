import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function Profile({ name, bio, imageUrl }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="h-28 w-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_12px_32px_-12px_rgba(160,82,40,0.45)] dark:ring-white/10 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)]"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="text-balance mt-2 max-w-xs text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
        {bio}
      </p>
    </section>
  );
}

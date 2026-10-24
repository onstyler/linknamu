"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/data/links";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: Link[] }) {
  // 서버에서 받은 값과, 이 화면에서 누른 횟수를 따로 들고 있다가 더해서 보여준다.
  // 데이터가 도착하기 전에 누른 클릭이 서버 값으로 덮어써지지 않게 하기 위함.
  const [serverCounts, setServerCounts] = useState<Counts>({});
  const [localClicks, setLocalClicks] = useState<Counts>({});

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Counts }) => setServerCounts(data.counts))
      .catch((error) => console.error("클릭 수를 불러오지 못했습니다.", error));
  }, []);

  function handleClick(id: string) {
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // keepalive: 링크로 이동하며 페이지가 바뀌어도 요청이 끝까지 전송되게 한다
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((error) => console.error("클릭 수를 저장하지 못했습니다.", error));
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}

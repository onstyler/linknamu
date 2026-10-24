import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { links } from "@/data/links";

// 클릭 수는 계속 바뀌므로 응답을 캐시하지 않는다
export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

const linkIds = new Set(links.map((link) => link.id));

async function clicks() {
  return (await getDb()).collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭 수를 한 번에 돌려준다: { counts: { github: 42, ... } }
export async function GET() {
  try {
    const docs = await (await clicks()).find().toArray();
    const counts: Record<string, number> = {};
    for (const doc of docs) counts[doc._id] = doc.count;
    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 링크 하나의 클릭 수를 1 올린다. 본문: { id: "github" }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;
  // 등록된 링크만 허용 — 아무 id로나 문서가 생기지 않게 막는다
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await clicks()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}

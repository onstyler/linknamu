import dns from "node:dns";
import { MongoClient } from "mongodb";

// 일부 Windows PC에서는 Node가 시스템 DNS를 못 읽고 127.0.0.1만 잡아서
// mongodb+srv 주소 조회(querySrv)가 ECONNREFUSED로 실패한다 — 개발 중에만 공용 DNS로 대체
if (process.env.NODE_ENV !== "production") {
  // 드라이버는 dns.promises를 쓰는데, 이쪽은 dns와 설정이 따로 잡힐 수 있어 둘 다 바꾼다
  for (const resolver of [dns, dns.promises]) {
    const servers = resolver.getServers();
    if (servers.length === 1 && servers[0] === "127.0.0.1") {
      resolver.setServers(["8.8.8.8", "1.1.1.1"]);
    }
  }
}

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 실행되므로
// 전역에 보관해 연결이 계속 새로 생기지 않게 한다
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

// 처음 쓰일 때 연결한다 — 빌드 중에는 DB에 접속하지 않도록
function getClient() {
  if (!globalForMongo.mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
    }
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 실패한 연결을 캐시에 남기면 이후 요청이 전부 같은 에러를 받으므로 비워서 다음에 재시도
      globalForMongo.mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(); // 연결 문자열의 DB 이름(linknamu)을 사용
}

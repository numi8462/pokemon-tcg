# 포켓몬 3D 도감 📚✨

Next.js 기반의 인터랙티브 포켓몬 카드게임 도감 사이트입니다. 실시간 검색/필터링 기능과 3D 카드 인터랙션을 제공하며, Supabase를 통해 데이터를 관리합니다. 현재는 일부 카드들만 있으며 추후 더 추가할 예정입니다.

![포켓몬 도감](https://github.com/user-attachments/assets/e3b73b82-17fc-42c1-a1d3-72fb66af538d)

![3d 카드](https://github.com/user-attachments/assets/f897e7c3-3cdb-4096-8ee1-8da63085bc4b)

## ✨ 주요 기능

- **실시간 검색 & 필터링**
  - 이름/타입 기반 즉시 검색
  - 다중 조건 필터링 시스템
- **3D 인터랙티브 카드**
  - 카드 드래그시 회전 조작 가능
  - 부드러운 애니메이션 전환
- **실시간 데이터 동기화**
  - Supabase 연동 자동 업데이트
  - 효율적인 데이터 캐싱 처리

## 🛠 기술 스택

- **Frontend**
  - Next.js 14 (App Router)
  - React 18
  - Tailwind CSS
- **3D 구현**
  - Three.js
- **Backend**
  - Supabase (실시간 DB)
  - PostgreSQL

## 🚀 시작하기

### 선행 조건
- Node.js v18 이상
- Yarn 또는 npm

### 설치 방법
```bash
git clone https://github.com/your-username/pokedex-3d.git
cd pokedex-3d
yarn install # 또는 npm install

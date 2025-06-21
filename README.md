# 🎬 EdgeFlix - Netflix-Style Streaming Platform

> 현대적인 React + TypeScript + Firebase로 구축된 넷플릭스 스타일의 스트리밍 플랫폼

![EdgeFlix Preview](https://images.unsplash.com/photo-1489599856216-4d5c4ec77ce9?w=1200&h=600&fit=crop)

## ✨ 주요 기능

### 🔐 **사용자 인증**
- Firebase Auth 기반 로그인/회원가입
- Google 소셜 로그인 지원
- 개인 프로필 및 설정 관리

### ⭐ **평점 및 리뷰 시스템**
- 콘텐츠별 5점 평점 시스템
- 상세한 리뷰 작성 및 관리
- 리뷰 좋아요 및 댓글 기능

### 🔍 **스마트 검색**
- 실시간 검색 기능
- 전역 상태 관리 (Zustand)
- 검색어 자동 완성 및 고급 필터링

### ❤️ **찜하기 시스템**
- 원클릭 북마크 기능
- 찜한 콘텐츠 개수 실시간 표시
- 개인화된 콘텐츠 관리

### 📱 **완전 반응형 디자인**
- 모바일부터 데스크톱까지 완벽 지원
- Touch-friendly 인터페이스
- 부드러운 애니메이션과 호버 효과

### 🎨 **현대적인 UI/UX**
- Netflix-inspired 디자인
- 다크 테마 기본 지원
- 직관적인 네비게이션

## 🛠️ 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| ![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react) | `18.3.1` | UI 프레임워크 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?logo=typescript) | `5.5.3` | 타입 안전성 |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38bdf8?logo=tailwindcss) | `3.4.11` | 스타일링 |
| ![Vite](https://img.shields.io/badge/Vite-5.4.1-646cff?logo=vite) | `5.4.1` | 빌드 도구 |
| ![Zustand](https://img.shields.io/badge/Zustand-4.4.7-ff6b6b) | `4.4.7` | 상태 관리 |
| ![React Router](https://img.shields.io/badge/React_Router-6.26.2-ca4245?logo=reactrouter) | `6.26.2` | 라우팅 |
| ![Firebase](https://img.shields.io/badge/Firebase-10.13.2-ffca28?logo=firebase) | `10.13.2` | 인증 & 데이터베이스 |

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn
- Firebase 프로젝트 (인증 기능 사용 시)
- TMDB API 키 (실제 영화 데이터 사용 시)

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/hwiery/edgeflix.git

# 디렉토리 이동
cd edgeflix

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Firebase 및 TMDB API 키 입력

# 개발 서버 실행
npm run dev
```

🌐 브라우저에서 `http://localhost:8080` 접속

### 🔐 Firebase 설정 (필수)
사용자 인증과 평점/리뷰 기능을 사용하려면 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 가이드를 참조하세요.

### 🎬 TMDB API 설정 (권장)
실제 영화 데이터를 사용하려면 [TMDB_SETUP.md](./TMDB_SETUP.md) 가이드를 참조하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview
```

## 📂 프로젝트 구조

```
edgeflix/
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── Header.tsx     # 네비게이션 헤더
│   │   ├── HeroSection.tsx # 메인 배너
│   │   ├── ContentRow.tsx  # 콘텐츠 행
│   │   ├── ContentCard.tsx # 콘텐츠 카드
│   │   ├── AuthModal.tsx   # 인증 모달
│   │   ├── UserProfile.tsx # 사용자 프로필
│   │   ├── RatingModal.tsx # 평점 모달
│   │   ├── ReviewModal.tsx # 리뷰 모달
│   │   ├── ReviewList.tsx  # 리뷰 목록
│   │   └── Footer.tsx     # 푸터
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── Index.tsx     # 메인 페이지
│   │   ├── SearchResults.tsx # 검색 결과 페이지
│   │   ├── Genre.tsx     # 장르 페이지
│   │   ├── MyList.tsx    # 찜한 콘텐츠 페이지
│   │   └── NotFound.tsx  # 404 페이지
│   ├── services/         # 서비스 계층
│   │   ├── firebase.ts   # Firebase 설정 및 인증
│   │   └── tmdbApi.ts    # TMDB API 연동
│   ├── store/            # 상태 관리
│   │   └── useStore.ts   # Zustand 스토어
│   ├── hooks/            # 커스텀 훅
│   │   └── useTMDB.ts    # TMDB API 훅
│   ├── lib/              # 유틸리티 함수
│   └── App.tsx           # 루트 컴포넌트
├── public/               # 정적 파일
└── docs/                 # 문서
```

## 🎮 사용법

### 사용자 인증
1. **회원가입/로그인**: 헤더의 "로그인" 버튼 클릭
2. **Google 로그인**: Google 계정으로 간편 로그인
3. **프로필 관리**: 로그인 후 프로필 아이콘에서 설정 관리

### 콘텐츠 탐색
1. **검색**: 헤더의 🔍 아이콘을 클릭하여 검색
2. **찜하기**: 콘텐츠 카드에 마우스 오버 후 ❤️ 버튼 클릭
3. **평점 매기기**: ⭐ 버튼을 클릭하여 1-5점 평점 입력
4. **재생**: ▶️ 버튼을 클릭하여 콘텐츠 재생
5. **리뷰 작성**: 상세 정보에서 리뷰 탭으로 이동

### 반응형 기능
- **데스크톱**: 가로 스크롤 화살표 버튼 사용
- **모바일**: 터치 스와이프로 콘텐츠 탐색
- **태블릿**: 하이브리드 네비게이션 지원

## 🔧 커스터마이징

### 테마 색상 변경
`src/index.css`의 CSS 변수 수정:

```css
:root {
  --primary: 0 81% 56%;      /* Netflix Red */
  --background: 0 0% 0%;     /* Black Background */  
  --foreground: 0 0% 100%;   /* White Text */
}
```

### 콘텐츠 데이터 추가
`src/pages/Index.tsx`에서 콘텐츠 배열 확장:

```typescript
const newContent: Content[] = [
  {
    id: 16,
    title: "Your Movie Title",
    image: "image-url",
    genre: "Action",
    year: "2024",
    rating: "9.0",
    description: "Movie description"
  }
];
```

## 🔄 개발 로드맵

### ✅ 1단계 완료 (기본 기능)
- [x] 반응형 UI/UX 디자인
- [x] 콘텐츠 검색 기본 UI
- [x] 찜하기/북마크 시스템
- [x] 상태 관리 (Zustand)
- [x] TypeScript 타입 안전성
- [x] Toast 알림 시스템
- [x] 404 페이지 및 빈 상태 처리

### ✅ 2단계 완료 (고급 기능)
- [x] **실제 검색 기능** - 헤더에서 검색 후 결과 페이지로 이동
- [x] **검색 결과 페이지** - 고급 필터링 (장르, 연도, 정렬)
- [x] **장르별 페이지** - 카테고리별 콘텐츠 탐색 및 그리드/리스트 뷰
- [x] **로딩 스켈레톤** - 이미지 로딩 상태 및 오류 처리
- [x] **TMDB API 연동 준비** - 실제 영화 데이터 사용 가능

### ✅ 3단계 완료 (데이터 & 플레이어)
- [x] **TMDB API 실제 연동** - 실제 영화/TV 데이터 표시
- [x] **React Query 캐싱** - 효율적인 데이터 관리 및 성능 최적화
- [x] **환경변수 지원** - API 키 보안 및 설정 가이드
- [x] **넷플릭스 스타일 비디오 플레이어** - 전체 화면, 키보드 단축키, 설정 메뉴
- [x] **이미지 최적화** - 다양한 해상도, 로딩 상태, 에러 처리

### ✅ 4단계 완료 (고급 기능) - NEW!
- [x] **Firebase 인증 시스템** - 이메일/Google 로그인, 사용자 프로필 관리
- [x] **평점 시스템** - 콘텐츠별 5점 평점 및 개인 평가 관리
- [x] **리뷰 시스템** - 상세 리뷰 작성, 좋아요, 댓글 기능
- [x] **사용자 데이터 동기화** - 클라우드 기반 찜하기 및 시청 기록
- [x] **실시간 데이터** - Firestore를 통한 실시간 리뷰 및 평점 업데이트

### 🚧 5단계 계획 (프로덕션 준비)
- [ ] 무한 스크롤 구현
- [ ] TMDB 트레일러 비디오 연동
- [ ] 자막 시스템
- [ ] PWA 지원 (오프라인 기능)
- [ ] 성능 최적화 (코드 스플리팅, 이미지 레이지 로딩)

### 📋 향후 계획 (최종 단계)
- [ ] 개인화 추천 알고리즘
- [ ] 시청 기록 및 진행률 추적
- [ ] 소셜 기능 확장 (친구, 공유)
- [ ] 다국어 지원
- [ ] A/B 테스트 및 분석 시스템

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. **Fork** 버튼을 클릭
2. 새로운 브랜치 생성: `git checkout -b feature/amazing-feature`
3. 변경사항 커밋: `git commit -m 'Add amazing feature'`
4. 브랜치에 푸시: `git push origin feature/amazing-feature`
5. **Pull Request** 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 개발자

**Hwiery**
- GitHub: [@hwiery](https://github.com/hwiery)
- 이메일: hwiery@example.com

---

## 📊 프로젝트 상태

![GitHub stars](https://img.shields.io/github/stars/hwiery/edgeflix)
![GitHub forks](https://img.shields.io/github/forks/hwiery/edgeflix)
![GitHub pull requests](https://img.shields.io/github/issues-pr/hwiery/edgeflix) 
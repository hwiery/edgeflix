# �� EdgeFlix - Netflix Style Streaming Platform

[![Deploy to Vercel](https://github.com/hwiery/edgeflix/actions/workflows/deploy.yml/badge.svg)](https://github.com/hwiery/edgeflix/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

현대적인 React + TypeScript + Firebase로 구축된 넷플릭스 스타일의 프리미엄 스트리밍 플랫폼입니다.

## 🚀 라이브 데모

**[EdgeFlix 바로가기](https://edgeflix.vercel.app)** - 지금 바로 체험해보세요!

## ✨ 주요 기능

### 🎯 핵심 기능 (완성됨)
- **🔐 Firebase 인증 시스템** - Google 소셜 로그인 및 이메일/비밀번호 로그인
- **🎬 TMDB API 연동** - 실제 영화/TV 쇼 데이터 연동
- **📱 PWA 지원** - 앱 설치 및 오프라인 기능 지원
- **⚡ 성능 최적화** - 코드 스플리팅, 이미지 레이지 로딩
- **🎮 비디오 플레이어** - 전체화면, 키보드 단축키 지원
- **⭐ 평점 및 리뷰 시스템** - 사용자 평점 및 리뷰 작성 기능
- **🔍 고급 검색 및 필터링** - 장르, 연도, 평점별 필터링
- **📱 반응형 디자인** - 모든 디바이스에서 완벽 지원

### 🎨 UI/UX
- **넷플릭스 스타일 디자인** - 모던하고 직관적인 UI
- **매끄러운 애니메이션** - Framer Motion 기반 부드러운 전환 효과
- **다크 테마** - 시청에 최적화된 다크 모드
- **Toast 알림 시스템** - 사용자 액션에 대한 즉각적인 피드백

### 🛠️ 기술적 특징
- **TypeScript 엄격 모드** - 타입 안전성 보장
- **ESLint + Prettier** - 일관된 코드 스타일
- **React Query** - 효율적인 서버 상태 관리
- **Zustand** - 가벼운 상태 관리 라이브러리
- **GitHub Actions** - 자동 CI/CD 파이프라인

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 엄격한 타입 체킹
- **Vite** - 빠른 개발 서버 및 빌드
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **React Router** - SPA 라우팅
- **React Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리

### Backend & Services
- **Firebase Authentication** - 사용자 인증
- **Firebase Firestore** - NoSQL 데이터베이스
- **TMDB API** - 영화/TV 쇼 데이터
- **React Player** - 비디오 재생

### Development & Deployment
- **Vercel** - 배포 및 호스팅
- **GitHub Actions** - CI/CD 파이프라인
- **ESLint + Prettier** - 코드 품질 관리
- **Lighthouse CI** - 성능 모니터링

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/hwiery/edgeflix.git
cd edgeflix
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# TMDB API
VITE_TMDB_API_KEY=your_tmdb_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 빌드 및 배포
```bash
# 개발용 빌드
npm run build:dev

# 프로덕션 빌드
npm run build:prod

# 배포 준비 (타입 체크 + 린트 + 빌드)
npm run deploy
```

## 📁 프로젝트 구조

```
src/
├── compoments/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트 (shadcn/ui)
│   ├── AuthModal.tsx   # 인증 모달
│   ├── Header.tsx      # 헤더 컴포넌트
│   ├── HeroSection.tsx # 메인 히어로 섹션
│   └── ...
├── hooks/              # 커스텀 React 훅
├── lib/                # 유틸리티 함수
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스 (Firebase, TMDB)
├── store/              # 상태 관리 (Zustand)
└── types/              # TypeScript 타입 정의
```

## 🔧 API 설정 가이드

### TMDB API 설정
1. [TMDB 웹사이트](https://www.themoviedb.org/)에서 계정 생성
2. API 키 발급 후 환경 변수에 설정
3. 자세한 설정은 [TMDB_SETUP.md](./TMDB_SETUP.md) 참고

### Firebase 설정
1. [Firebase 콘솔](https://console.firebase.google.com/)에서 프로젝트 생성
2. Authentication 및 Firestore Database 활성화
3. 웹 앱 등록 후 설정 정보를 환경 변수에 설정
4. 자세한 설정은 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 참고

## 📱 PWA (Progressive Web App)

EdgeFlix는 PWA를 지원하여 다음과 같은 기능을 제공합니다:

- **🏠 홈 화면 설치** - 모바일/데스크톱에서 앱처럼 설치 가능
- **📴 오프라인 지원** - 인터넷 연결 없이도 기본 기능 이용 가능
- **🔄 백그라운드 동기화** - 네트워크 복구 시 자동 데이터 동기화
- **📱 네이티브 앱 경험** - 모바일에서 네이티브 앱과 동일한 UX

## 🎯 성능 최적화

- **⚡ 코드 스플리팅** - 페이지별 lazy loading으로 초기 로딩 시간 단축
- **🖼️ 이미지 최적화** - lazy loading 및 다양한 해상도 지원
- **📦 번들 최적화** - Vite의 rollup 기반 트리 쉐이킹
- **🎨 CSS 최적화** - Tailwind CSS의 purge 기능으로 미사용 스타일 제거

## 🧪 개발 도구

### 코드 품질
```bash
# TypeScript 타입 체크
npm run type-check

# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# Prettier 검사
npm run format:check
```

### 빌드 도구
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build:prod

# 빌드 결과 미리보기
npm run preview

# 빌드 파일 정리
npm run clean
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 🔗 링크

- **라이브 데모**: [https://edgeflix.vercel.app](https://edgeflix.vercel.app)
- **GitHub 저장소**: [https://github.com/hwiery/edgeflix](https://github.com/hwiery/edgeflix)
- **이슈 트래커**: [https://github.com/hwiery/edgeflix/issues](https://github.com/hwiery/edgeflix/issues)

## 👨‍💻 개발자

**EdgeFlix Team**
- GitHub: [@hwiery](https://github.com/hwiery)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요! 
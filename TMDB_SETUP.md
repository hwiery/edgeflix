# 🎬 TMDB API 설정 가이드

EdgeFlix에서 실제 영화 및 TV 프로그램 데이터를 사용하려면 TMDB (The Movie Database) API 키가 필요합니다.

## 📋 TMDB API 키 발급받기

### 1단계: TMDB 계정 생성
1. [TMDB 웹사이트](https://www.themoviedb.org)에 접속
2. 우상단 **"Join TMDB"** 클릭
3. 이메일, 사용자명, 비밀번호로 계정 생성
4. 이메일 인증 완료

### 2단계: API 키 신청
1. 로그인 후 프로필 → **"Settings"** 클릭
2. 좌측 메뉴에서 **"API"** 선택
3. **"Create"** 또는 **"Request an API Key"** 클릭
4. **"Developer"** 선택
5. 애플리케이션 정보 입력:
   - **Application Name**: EdgeFlix
   - **Application URL**: http://localhost:8080 (또는 배포 URL)
   - **Application Summary**: Netflix-style streaming platform for learning purposes
6. 이용 약관에 동의하고 제출

### 3단계: API 키 확인
- API 키 승인 후 Settings → API 페이지에서 **"API Key (v3 auth)"** 확인
- 32자리 영숫자 조합의 키가 발급됩니다

## ⚙️ 프로젝트 설정

### 환경변수 파일 생성
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음을 추가:

```bash
# TMDB API 키
VITE_TMDB_API_KEY=여기에_발급받은_API_키_입력

# 개발 환경
VITE_ENV=development
```

### 예시
```bash
# .env 파일 예시
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
VITE_ENV=development
```

## 🔄 적용 확인

1. 서버 재시작:
   ```bash
   npm run dev
   ```

2. 브라우저에서 확인:
   - API 키가 올바르게 설정되면 실제 영화 데이터가 표시됩니다
   - 검색 기능에서 실제 TMDB 데이터를 검색할 수 있습니다
   - 페이지 상단의 노란색 경고 메시지가 사라집니다

## 🛡️ 보안 주의사항

### ⚠️ 중요: API 키 보안
- **절대로** API 키를 GitHub 등 공개 저장소에 커밋하지 마세요
- `.env` 파일은 `.gitignore`에 포함되어야 합니다
- 프로덕션 배포 시 환경변수로 설정하세요

### 권장사항
- API 키는 개발 전용으로만 사용하세요
- 상업적 용도 시 TMDB 상업 라이선스를 확인하세요
- API 요청 한도를 확인하고 적절히 캐싱하세요

## 🔧 트러블슈팅

### API 키가 작동하지 않는 경우

1. **키 형식 확인**
   - 32자리 영숫자인지 확인
   - 공백이나 특수문자가 없는지 확인

2. **환경변수 확인**
   ```bash
   # 터미널에서 확인
   echo $VITE_TMDB_API_KEY
   ```

3. **서버 재시작**
   - 환경변수 변경 후 반드시 개발 서버 재시작

4. **브라우저 개발자 도구 확인**
   - Console에서 API 오류 메시지 확인
   - Network 탭에서 TMDB API 요청 상태 확인

### 일반적인 오류

| 오류 코드 | 의미 | 해결 방법 |
|-----------|------|-----------|
| 401 | 유효하지 않은 API 키 | API 키 재확인 |
| 404 | 요청한 리소스 없음 | URL 또는 ID 확인 |
| 429 | 요청 한도 초과 | 잠시 후 재시도 |

## 📚 API 사용량 제한

**무료 계정 기준:**
- 초당 40회 요청
- 일일 1,000,000회 요청
- 월간 제한 없음

## 🌟 활용 가능한 기능

API 키 설정 후 사용 가능한 기능들:

### 🎬 콘텐츠 데이터
- ✅ 실시간 트렌딩 영화/TV
- ✅ 인기 콘텐츠
- ✅ 최신 개봉작
- ✅ 높은 평점 작품
- ✅ 장르별 탐색

### 🔍 검색 기능
- ✅ 영화/TV 통합 검색
- ✅ 고급 필터링
- ✅ 실시간 검색 결과
- ✅ 자동완성 (향후 구현 예정)

### 📊 상세 정보
- ✅ 고해상도 포스터 이미지
- ✅ 상세 줄거리
- ✅ 실제 평점 정보
- ✅ 출연진 및 제작진 정보

## 📞 지원

문제가 지속되는 경우:
1. [TMDB API 문서](https://developers.themoviedb.org/3) 참조
2. [TMDB 지원 포럼](https://www.themoviedb.org/talk) 문의
3. EdgeFlix GitHub Issues에 문제 보고

---

🎉 **축하합니다!** 이제 EdgeFlix에서 실제 영화 데이터를 즐길 수 있습니다! 
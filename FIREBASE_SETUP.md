# 🔥 Firebase 설정 가이드

EdgeFlix의 인증 시스템과 데이터베이스 기능을 사용하기 위해 Firebase를 설정하는 방법을 안내합니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: "edgeflix")
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. Firebase 웹 앱 설정

1. 프로젝트 개요 페이지에서 "웹" 아이콘 클릭
2. 앱 이름 입력 (예: "EdgeFlix Web")
3. "Firebase 호스팅 설정" 체크박스는 선택하지 않음
4. "앱 등록" 클릭
5. Firebase SDK 설정 코드 복사 (나중에 사용)

## 3. Authentication 설정

### 3-1. 로그인 방법 활성화
1. 프로젝트 콘솔에서 "Authentication" 메뉴 클릭
2. "Sign-in method" 탭 클릭
3. 다음 로그인 방법들을 활성화:
   - **이메일/비밀번호**: 사용 설정
   - **Google**: 사용 설정 후 프로젝트 지원 이메일 설정

### 3-2. 승인된 도메인 추가
1. "Sign-in method" 탭에서 "승인된 도메인" 섹션 확인
2. 개발 중에는 `localhost`가 자동으로 추가됨
3. 배포 시 실제 도메인 추가 필요

## 4. Firestore Database 설정

1. 프로젝트 콘솔에서 "Firestore Database" 메뉴 클릭
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 모드 선택:
   - **테스트 모드**: 개발 중 사용 (30일 후 만료)
   - **잠금 모드**: 프로덕션 환경에서 사용
4. 위치 선택 (asia-northeast3 - 서울 권장)
5. 데이터베이스 생성 완료

### 4-1. 보안 규칙 설정
개발 완료 후 다음 규칙으로 업데이트:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 프로필 - 본인만 읽기/쓰기 가능
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 리뷰 - 로그인한 사용자만 읽기 가능, 작성자만 수정/삭제 가능
    match /reviews/{reviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 5. 환경변수 설정

1. 프로젝트 루트에 `.env` 파일 생성
2. Firebase 설정 정보 입력:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### 5-1. 설정 값 확인 방법
1. Firebase 콘솔에서 프로젝트 설정 (톱니바퀴 아이콘) 클릭
2. "일반" 탭에서 "내 앱" 섹션 확인
3. 웹 앱 선택 후 "Firebase SDK snippet" 에서 "구성" 선택
4. 표시된 config 객체의 값들을 환경변수에 입력

## 6. Google 로그인 추가 설정

### 6-1. OAuth 동의 화면 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Firebase 프로젝트와 연결된 프로젝트 선택
3. "APIs & Services" > "OAuth consent screen" 메뉴
4. 사용자 유형 선택 (개발 중: 내부, 배포 시: 외부)
5. 앱 정보 입력:
   - 앱 이름: EdgeFlix
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일

### 6-2. 승인된 JavaScript 원본 추가
1. "APIs & Services" > "Credentials" 메뉴
2. OAuth 2.0 클라이언트 ID 선택
3. "승인된 JavaScript 원본"에 도메인 추가:
   - 개발: `http://localhost:5173`
   - 배포: `https://yourdomain.com`

## 7. 개발 서버 실행

```bash
npm run dev
```

## 8. 기능 테스트

### 8-1. 회원가입 테스트
1. 헤더의 "로그인" 버튼 클릭
2. "회원가입" 탭으로 전환
3. 이메일/비밀번호로 회원가입 또는 Google 로그인 테스트

### 8-2. 데이터베이스 확인
1. Firebase 콘솔에서 Firestore Database 확인
2. 회원가입 후 `users` 컬렉션에 사용자 데이터 생성 확인

## 9. 문제 해결

### 9-1. 일반적인 오류
- **Firebase 설정 오류**: 환경변수 값 재확인
- **Google 로그인 실패**: OAuth 설정 및 승인된 도메인 확인
- **Firestore 권한 오류**: 보안 규칙 확인

### 9-2. 개발자 도구 활용
브라우저 개발자도구의 Console 탭에서 Firebase 관련 오류 메시지 확인

## 10. 프로덕션 배포 시 주의사항

1. **보안 규칙 업데이트**: 테스트 모드에서 프로덕션 규칙로 변경
2. **승인된 도메인 추가**: 실제 배포 도메인을 Firebase 설정에 추가
3. **환경변수 보안**: 프로덕션 환경에서 환경변수 안전하게 관리
4. **Google OAuth 설정**: 프로덕션 도메인을 Google Cloud Console에 추가

---

## 📞 지원

설정 중 문제가 발생하면 다음 리소스를 참고하세요:

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firebase Authentication 가이드](https://firebase.google.com/docs/auth)
- [Firestore 시작하기](https://firebase.google.com/docs/firestore)

성공적으로 설정이 완료되면 EdgeFlix의 모든 인증 및 데이터베이스 기능을 사용할 수 있습니다! 🎉 
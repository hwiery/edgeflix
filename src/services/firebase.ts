// Firebase 설정 및 인증 서비스
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'dummy-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'dummy-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
};

// Firebase 환경변수 확인
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'dummy-api-key';

// Firebase 초기화
let app: any = null;
let auth: any = null;
let db: any = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  if (!isFirebaseConfigured) {
    console.warn('⚠️ Firebase 환경변수가 설정되지 않았습니다. 인증 기능이 제한됩니다.');
  }
} catch (error) {
  console.error('Firebase 초기화 실패:', error);
  console.warn('Firebase 기능이 비활성화됩니다. FIREBASE_SETUP.md를 참조하여 설정하세요.');
}

export { auth, db, isFirebaseConfigured };

// Google 로그인 프로바이더
const googleProvider = new GoogleAuthProvider();

// 사용자 인터페이스 정의
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  favoriteGenres: string[];
  watchlist: string[];
  watchHistory: string[];
  ratings: { [key: string]: number };
  createdAt: Date;
  updatedAt: Date;
}

// 리뷰 인터페이스 정의
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  contentId: string;
  contentType: 'movie' | 'tv';
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: string[];
}

// 인증 관련 함수들
export const authService = {
  // 이메일/비밀번호 회원가입
  async signUpWithEmail(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Firestore에 사용자 프로필 생성
    await this.createUserProfile(userCredential.user);
    
    return userCredential.user;
  },

  // 이메일/비밀번호 로그인
  async signInWithEmail(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Google 로그인
  async signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    
    // 기존 사용자 프로필 확인
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await this.createUserProfile(result.user);
    }
    
    return result.user;
  },

  // 로그아웃
  async signOut() {
    return await signOut(auth);
  },

  // 사용자 프로필 생성
  async createUserProfile(user: User) {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      favoriteGenres: [],
      watchlist: [],
      watchHistory: [],
      ratings: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  },

  // 사용자 프로필 가져오기
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() as UserProfile : null;
  },

  // 사용자 프로필 업데이트
  async updateUserProfile(uid: string, updates: Partial<UserProfile>) {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: new Date(),
    });
  },

  // 찜 목록에 추가/제거
  async toggleWatchlist(uid: string, contentId: string) {
    const userProfile = await this.getUserProfile(uid);
    if (!userProfile) return;

    const watchlist = userProfile.watchlist || [];
    const isInWatchlist = watchlist.includes(contentId);

    const updatedWatchlist = isInWatchlist
      ? watchlist.filter(id => id !== contentId)
      : [...watchlist, contentId];

    await this.updateUserProfile(uid, { watchlist: updatedWatchlist });
    return !isInWatchlist;
  },

  // 시청 기록 추가
  async addToWatchHistory(uid: string, contentId: string) {
    const userProfile = await this.getUserProfile(uid);
    if (!userProfile) return;

    const watchHistory = userProfile.watchHistory || [];
    const updatedHistory = [contentId, ...watchHistory.filter(id => id !== contentId)];

    await this.updateUserProfile(uid, { watchHistory: updatedHistory.slice(0, 50) });
  },
};

// 리뷰 관련 함수들
export const reviewService = {
  // 리뷰 작성
  async createReview(
    userId: string,
    userName: string,
    userPhoto: string | undefined,
    contentId: string,
    contentType: 'movie' | 'tv',
    rating: number,
    title: string,
    content: string
  ) {
    const review: Omit<Review, 'id'> = {
      userId,
      userName,
      userPhoto,
      contentId,
      contentType,
      rating,
      title,
      content,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
    };

    const docRef = await addDoc(collection(db, 'reviews'), review);
    return { id: docRef.id, ...review };
  },

  // 콘텐츠별 리뷰 가져오기
  async getReviewsByContent(contentId: string, contentType: 'movie' | 'tv'): Promise<Review[]> {
    const q = query(
      collection(db, 'reviews'),
      where('contentId', '==', contentId),
      where('contentType', '==', contentType),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
  },

  // 사용자별 리뷰 가져오기
  async getReviewsByUser(userId: string): Promise<Review[]> {
    const q = query(
      collection(db, 'reviews'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
  },

  // 리뷰 좋아요 토글
  async toggleReviewLike(reviewId: string, userId: string) {
    const reviewDoc = await getDoc(doc(db, 'reviews', reviewId));
    if (!reviewDoc.exists()) return;

    const review = reviewDoc.data() as Review;
    const likedBy = review.likedBy || [];
    const isLiked = likedBy.includes(userId);

    const updatedLikedBy = isLiked
      ? likedBy.filter(id => id !== userId)
      : [...likedBy, userId];

    await updateDoc(doc(db, 'reviews', reviewId), {
      likedBy: updatedLikedBy,
      likes: updatedLikedBy.length,
    });

    return !isLiked;
  },
};

// 평점 관련 함수들
export const ratingService = {
  // 콘텐츠 평점 추가/업데이트
  async rateContent(userId: string, contentId: string, rating: number) {
    const userProfile = await authService.getUserProfile(userId);
    if (!userProfile) return;

    const ratings = userProfile.ratings || {};
    ratings[contentId] = rating;

    await authService.updateUserProfile(userId, { ratings });
    return rating;
  },

  // 사용자의 콘텐츠 평점 가져오기
  async getUserRating(userId: string, contentId: string): Promise<number | null> {
    const userProfile = await authService.getUserProfile(userId);
    if (!userProfile) return null;

    return userProfile.ratings?.[contentId] || null;
  },

  // 콘텐츠의 평균 평점 계산 (향후 확장 가능)
  async getAverageRating(contentId: string): Promise<number> {
    // 현재는 단순한 구현, 나중에 집계 함수로 최적화 가능
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    
    let totalRating = 0;
    let ratingCount = 0;

    querySnapshot.docs.forEach(doc => {
      const userData = doc.data() as UserProfile;
      if (userData.ratings && userData.ratings[contentId]) {
        totalRating += userData.ratings[contentId];
        ratingCount++;
      }
    });

    return ratingCount > 0 ? totalRating / ratingCount : 0;
  },
}; 
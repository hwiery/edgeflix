import { create } from 'zustand';
import { ToastData } from '../compoments/Toast';

/**
 * 콘텐츠 타입 정의
 */
export interface Content {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: string;
  rating: string;
  description?: string;
  duration?: string;
  isBookmarked?: boolean;
}

/**
 * 스토어 상태 타입 정의
 */
interface AppState {
  // 상태
  searchTerm: string;
  bookmarkedContent: Content[];
  isLoading: boolean;
  toasts: ToastData[];
  
  // 액션
  setSearchTerm: (term: string) => void;
  toggleBookmark: (content: Content) => void;
  setLoading: (loading: boolean) => void;
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
}

/**
 * 글로벌 상태 관리 스토어
 */
export const useStore = create<AppState>((set, get) => ({
  // 초기 상태
  searchTerm: '',
  bookmarkedContent: [],
  isLoading: false,
  toasts: [],
  
  // 액션 구현
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  
  toggleBookmark: (content: Content) => set((state) => {
    const isAlreadyBookmarked = state.bookmarkedContent.some(item => item.id === content.id);
    
    // Toast 알림 추가
    const { addToast } = get();
    
    if (isAlreadyBookmarked) {
      addToast({
        type: 'bookmark-remove',
        title: '찜목록에서 제거됨',
        message: `"${content.title}"이(가) 찜목록에서 제거되었습니다.`,
        duration: 2000
      });
      
      return {
        bookmarkedContent: state.bookmarkedContent.filter(item => item.id !== content.id)
      };
    } else {
      addToast({
        type: 'bookmark-add',
        title: '찜목록에 추가됨',
        message: `"${content.title}"이(가) 찜목록에 추가되었습니다.`,
        duration: 2000
      });
      
      return {
        bookmarkedContent: [...state.bookmarkedContent, { ...content, isBookmarked: true }]
      };
    }
  }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  addToast: (toastData: Omit<ToastData, 'id'>) => set((state) => ({
    toasts: [
      ...state.toasts,
      {
        ...toastData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }
    ]
  })),
  
  removeToast: (id: string) => set((state) => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  }))
})); 
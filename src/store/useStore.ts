import { create } from 'zustand';

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
  
  // 액션
  setSearchTerm: (term: string) => void;
  toggleBookmark: (content: Content) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * 글로벌 상태 관리 스토어
 */
export const useStore = create<AppState>((set) => ({
  // 초기 상태
  searchTerm: '',
  bookmarkedContent: [],
  isLoading: false,
  
  // 액션 구현
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  
  toggleBookmark: (content: Content) => set((state) => {
    const isAlreadyBookmarked = state.bookmarkedContent.some(item => item.id === content.id);
    
    if (isAlreadyBookmarked) {
      return {
        bookmarkedContent: state.bookmarkedContent.filter(item => item.id !== content.id)
      };
    } else {
      return {
        bookmarkedContent: [...state.bookmarkedContent, { ...content, isBookmarked: true }]
      };
    }
  }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading })
})); 
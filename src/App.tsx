import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import ToastContainer from './compoments/ToastContainer';
import { ContentCardSkeleton } from './compoments/ui/skeleton';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      retry: 1,
    },
  },
});

// Lazy loading으로 페이지 컴포넌트들을 동적 import
const Index = React.lazy(() => import('./pages/Index'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const Genre = React.lazy(() => import('./pages/Genre'));
const MyList = React.lazy(() => import('./pages/MyList'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// 로딩 스켈레톤 컴포넌트
const PageLoadingSkeleton = () => (
  <div className="min-h-screen bg-black pt-20">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* 페이지 제목 스켈레톤 */}
        <div className="h-8 bg-gray-800 rounded w-64 animate-pulse"></div>
        
        {/* 콘텐츠 그리드 스켈레톤 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <ContentCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * 메인 앱 컴포넌트
 * 라우팅 및 레이아웃을 관리합니다
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App min-h-screen bg-black text-white">
          {/* 헤더 */}
          <Header />
          
          {/* 메인 콘텐츠 */}
          <main className="pt-16">
            <Suspense fallback={<PageLoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/genre" element={<Genre />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          {/* 푸터 */}
          <Footer />
          
          {/* 토스트 알림 */}
          <ToastContainer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

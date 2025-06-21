import { Menu, Search, Bell, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';

/**
 * 헤더 컴포넌트
 * 로고, 네비게이션 메뉴, 검색, 사용자 프로필을 포함합니다
 */
export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // 검색 제출 핸들러
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="text-red-600 text-2xl font-bold">
            EdgeFlix
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              홈
            </Link>
            <Link to="/genre?category=movie" className="text-white hover:text-gray-300 transition-colors">
              영화
            </Link>
            <Link to="/genre?category=tv" className="text-white hover:text-gray-300 transition-colors">
              TV 프로그램
            </Link>
            <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors">
              내가 찜한 콘텐츠
            </Link>
          </nav>

          {/* 검색 및 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="검색..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>

            {/* 알림 */}
            <button className="text-white hover:text-gray-300 transition-colors">
              <Bell className="w-6 h-6" />
            </button>

            {/* 사용자 프로필 또는 로그인 버튼 */}
            {!loading && (
              user ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">로그인</span>
                </button>
              )
            )}

            {/* 모바일 메뉴 */}
            <button className="md:hidden text-white hover:text-gray-300 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 인증 모달 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Zustand 스토어에서 상태와 액션 가져오기
  const { searchTerm, setSearchTerm, bookmarkedContent } = useStore();

  const navItems = ['홈', '탐색', '영화', '시리즈', '내가 찜한 콘텐츠'];

  /**
   * 검색어 입력 핸들러
   */
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * 검색 모드 토글 핸들러
   */
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // 검색창이 열릴 때 기존 검색어 초기화
      setSearchTerm('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              EDGEFLIX
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-black/50 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="검색..."
                    className="bg-transparent text-white placeholder-gray-400 outline-none w-48"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <button
                    onClick={handleSearchToggle}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200 hidden md:block relative">
              <Bell className="w-5 h-5" />
              {bookmarkedContent.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {bookmarkedContent.length}
                </span>
              )}
            </button>

            {/* Profile */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200 hidden md:block">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors duration-200 md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2"
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
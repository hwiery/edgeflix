// 사용자 프로필 드롭다운 컴포넌트
import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Star, Clock, Heart } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, authService } from '../services/firebase';
import { useStore } from '../store/useStore';

/**
 * 사용자 프로필 드롭다운 컴포넌트
 * 로그인한 사용자의 프로필 정보와 메뉴를 표시합니다
 */
export default function UserProfile() {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addToast } = useStore();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 로그아웃 핸들러
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      addToast('로그아웃되었습니다.', 'success');
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
      addToast('로그아웃 중 오류가 발생했습니다.', 'error');
    }
  };

  // 로딩 중이거나 사용자가 없으면 렌더링하지 않음
  if (loading || !user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 프로필 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || '사용자'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-300" />
          </div>
        )}
        <span className="text-white font-medium hidden sm:block">
          {user.displayName || '사용자'}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          {/* 사용자 정보 */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || '사용자'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <div>
                <h3 className="text-white font-medium">
                  {user.displayName || '사용자'}
                </h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* 메뉴 항목들 */}
          <div className="py-2">
            {/* 찜한 콘텐츠 */}
            <button
              onClick={() => {
                window.location.href = '/my-list';
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>찜한 콘텐츠</span>
            </button>

            {/* 시청 기록 */}
            <button
              onClick={() => {
                // 향후 시청 기록 페이지로 이동
                addToast('시청 기록 기능은 곧 출시됩니다!', 'info');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span>시청 기록</span>
            </button>

            {/* 내가 평가한 콘텐츠 */}
            <button
              onClick={() => {
                // 향후 평점 관리 페이지로 이동
                addToast('평점 관리 기능은 곧 출시됩니다!', 'info');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Star className="w-5 h-5" />
              <span>내 평점</span>
            </button>

            {/* 구분선 */}
            <div className="border-t border-gray-700 my-2"></div>

            {/* 설정 */}
            <button
              onClick={() => {
                // 향후 설정 페이지로 이동
                addToast('설정 기능은 곧 출시됩니다!', 'info');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>설정</span>
            </button>

            {/* 로그아웃 */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
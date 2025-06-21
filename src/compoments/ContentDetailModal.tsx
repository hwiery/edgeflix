import React from 'react';
import { X, Play, Plus, Check, Star, Clock, Calendar } from 'lucide-react';
import { Content, useStore } from '../store/useStore';

interface ContentDetailModalProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 콘텐츠 상세 정보 모달 컴포넌트
 */
const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ content, isOpen, onClose }) => {
  const { bookmarkedContent, toggleBookmark } = useStore();

  if (!content || !isOpen) return null;

  // 현재 콘텐츠가 찜목록에 있는지 확인
  const isBookmarked = bookmarkedContent.some(item => item.id === content.id);

  /**
   * 찜하기 토글 핸들러
   */
  const handleBookmarkToggle = () => {
    toggleBookmark(content);
  };

  /**
   * 재생 버튼 클릭 핸들러
   */
  const handlePlayClick = () => {
    console.log(`재생: ${content.title}`);
    // TODO: 실제 재생 로직 구현
  };

  /**
   * 모달 외부 클릭 시 닫기
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4 bg-gray-900 rounded-lg overflow-hidden animate-scale-in">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="모달 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 이미지 */}
        <div className="relative h-80 md:h-96">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* 헤더 콘텐츠 */}
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {content.title}
            </h1>
            
            {/* 액션 버튼들 */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayClick}
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>재생</span>
              </button>
              
              <button
                onClick={handleBookmarkToggle}
                className={`rounded-full p-3 transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-700/80 text-white hover:bg-gray-600/80'
                }`}
                aria-label={isBookmarked ? '찜목록에서 제거' : '찜목록에 추가'}
              >
                {isBookmarked ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 콘텐츠 정보 */}
        <div className="p-6 space-y-6">
          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-medium">{content.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{content.year}</span>
            </div>
            
            {content.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{content.duration}</span>
              </div>
            )}
            
            <span className="bg-gray-700 px-2 py-1 rounded text-xs font-medium">
              {content.genre}
            </span>
          </div>

          {/* 줄거리 */}
          {content.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">줄거리</h3>
              <p className="text-gray-300 leading-relaxed">
                {content.description}
              </p>
            </div>
          )}

          {/* 추가 정보 섹션 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold mb-2 text-white">출연진</h4>
              <p className="text-gray-400 text-sm">
                주연 배우 정보 (API 연동 시 추가 예정)
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-2 text-white">제작진</h4>
              <p className="text-gray-400 text-sm">
                감독, 제작자 정보 (API 연동 시 추가 예정)
              </p>
            </div>
          </div>

          {/* 비슷한 콘텐츠 */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">비슷한 콘텐츠</h4>
            <div className="text-gray-400 text-sm">
              추천 알고리즘 (향후 구현 예정)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal; 
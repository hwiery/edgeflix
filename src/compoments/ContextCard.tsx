import React, { useState } from 'react';
import { Play, Plus, ChevronDown, Check } from 'lucide-react';
import { useStore, Content } from '../store/useStore';
import ContentDetailModal from './ContentDetailModal';
import VideoPlayer from './VideoPlayer';
import { ContentCardSkeleton } from './ui/skeleton';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  
  // Intersection Observer 훅 사용
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });
  
  // Zustand 스토어에서 상태와 액션 가져오기
  const { bookmarkedContent, toggleBookmark } = useStore();
  
  // 현재 콘텐츠가 찜목록에 있는지 확인
  const isBookmarked = bookmarkedContent.some(item => item.id === content.id);

  /**
   * 찜하기 토글 핸들러
   */
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    toggleBookmark(content);
  };

  /**
   * 재생 버튼 클릭 핸들러 - 상세 모달 먼저 열기
   */
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  /**
   * 상세 정보 보기 핸들러
   */
  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  /**
   * 카드 클릭 시 상세 모달 열기
   */
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // 컴포넌트가 뷰포트에 진입하지 않았으면 스켈레톤 표시
  if (!hasIntersected) {
    return (
      <div ref={elementRef as React.RefObject<HTMLDivElement>}>
        <ContentCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="relative min-w-[280px] md:min-w-[320px] cursor-pointer transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Main Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
          {/* 로딩 스켈레톤 */}
          {isImageLoading && !hasImageError && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          
          {/* 이미지 로드 에러 시 플레이스홀더 */}
          {hasImageError ? (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-sm">이미지를 불러올 수 없습니다</div>
              </div>
            </div>
          ) : (
            <img
              src={content.image}
              alt={content.title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setHasImageError(true);
              }}
            />
          )}
          
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                onClick={handlePlayClick}
                aria-label={`${content.title} 재생`}
              >
                <Play className="w-8 h-8 text-white fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Card on Hover */}
        {isHovered && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm rounded-b-lg border border-gray-700/50 p-4 z-20 animate-fade-in">
            {/* Title and Meta */}
            <div className="mb-3">
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{content.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-green-400">★ {content.rating}</span>
                <span>•</span>
                <span>{content.year}</span>
                <span>•</span>
                <span>{content.genre}</span>
              </div>
            </div>

            {/* Description Preview */}
            {content.description && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {content.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
                  onClick={handlePlayClick}
                  aria-label={`${content.title} 재생`}
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <button 
                  className={`rounded-full p-2 transition-all duration-200 ${
                    isBookmarked 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                  onClick={handleBookmarkToggle}
                  aria-label={isBookmarked ? `${content.title} 찜목록에서 제거` : `${content.title} 찜목록에 추가`}
                >
                  {isBookmarked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              <button 
                className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition-colors"
                onClick={handleMoreInfoClick}
                aria-label={`${content.title} 더 보기`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 상세 정보 모달 */}
      <ContentDetailModal
        content={content}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 비디오 플레이어 */}
      {isVideoPlayerOpen && (
        <VideoPlayer
          url={getVideoUrl(content)}
          title={content.title}
          onClose={() => setIsVideoPlayerOpen(false)}
          autoPlay={true}
        />
      )}
    </>
  );
};

/**
 * 콘텐츠별 비디오 URL 가져오기 (데모용)
 */
const getVideoUrl = (content: Content): string => {
  // 실제 구현에서는 TMDB API에서 트레일러 URL을 가져와야 합니다
  // 현재는 데모용 YouTube 비디오 URL을 반환합니다
  const demoVideos: Record<string, string> = {
    'The Matrix Resurrections': 'https://www.youtube.com/watch?v=9ix7TUGVYIo',
    'Ocean Waves': 'https://www.youtube.com/watch?v=K4DyBUG242c',
    'Starlight': 'https://www.youtube.com/watch?v=BgAlQuqzl8o',
    'Digital Dreams': 'https://www.youtube.com/watch?v=qQwJMTNBXQU',
    'Midnight Stories': 'https://www.youtube.com/watch?v=3sLjHjfNfow',
    'Urban Legends': 'https://www.youtube.com/watch?v=n9xhJrPXop4'
  };

  // 콘텐츠 제목으로 비디오 URL 찾기
  const videoUrl = demoVideos[content.title];
  if (videoUrl) {
    return videoUrl;
  }

  // 기본 데모 비디오 (Big Buck Bunny)
  return 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
};

export default ContentCard;

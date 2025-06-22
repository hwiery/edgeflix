import React, { useState } from 'react';
import { X, Play, Plus, Heart, Star, MessageCircle } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';
import { useStore } from '../store/useStore';
import { Content } from '../store/useStore';
import VideoPlayer from './VideoPlayer';
import RatingModal from './RatingModal';
import ReviewModal from './ReviewModal';
import ReviewList from './ReviewList';

interface ContentDetailModalProps {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 콘텐츠 상세 정보 모달 컴포넌트
 * 콘텐츠의 상세 정보, 평점 및 리뷰 기능을 제공합니다
 */
export default function ContentDetailModal({ content, isOpen, onClose }: ContentDetailModalProps) {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { bookmarkedContent, toggleBookmark, addToast } = useStore();

  // 찜 목록에 있는지 확인
  const isBookmarked = bookmarkedContent.some(item => item.id === content.id);

  // 찜하기 토글 핸들러
  const handleBookmarkToggle = () => {
    toggleBookmark(content);
    addToast(
      isBookmarked
        ? `${content.title}을(를) 찜 목록에서 제거했습니다.`
        : `${content.title}을(를) 찜 목록에 추가했습니다.`,
      isBookmarked ? 'info' : 'success'
    );
  };

  // 재생 버튼 클릭 핸들러
  const handlePlayClick = () => {
    setIsVideoOpen(true);
  };

  // 평점 매기기 핸들러
  const handleRatingClick = () => {
    if (!user) {
      addToast('로그인이 필요합니다.', 'warning');
      return;
    }
    setIsRatingModalOpen(true);
  };

  // 리뷰 작성 핸들러
  const handleReviewClick = () => {
    if (!user) {
      addToast('로그인이 필요합니다.', 'warning');
      return;
    }
    setIsReviewModalOpen(true);
  };

  // 비디오 URL 생성 함수
  const getVideoUrl = (content: Content): string => {
    // 콘텐츠 제목을 기반으로 YouTube 데모 비디오 매핑
    const videoMap: { [key: string]: string } = {
      'Stranger Things': 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
      'The Crown': 'https://www.youtube.com/watch?v=JWtnJjn6ng0',
      'Money Heist': 'https://www.youtube.com/watch?v=_InqQJRqGW4',
      'Squid Game': 'https://www.youtube.com/watch?v=oqxAJKy0ii4',
      'Wednesday': 'https://www.youtube.com/watch?v=Di310WS8zLk',
      'The Witcher': 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
      'Ozark': 'https://www.youtube.com/watch?v=5hAXVqrljbs',
      'Dark': 'https://www.youtube.com/watch?v=rrwycJ08PSA',
      'Bridgerton': 'https://www.youtube.com/watch?v=gpv7ayf_tyE',
      'Lupin': 'https://www.youtube.com/watch?v=ga0iTWXCGa0',
    };
    
    return videoMap[content.title] || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // 기본 비디오
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* 모달 헤더 */}
          <div className="relative">
            {/* 배경 이미지 */}
            <div className="aspect-video w-full bg-gray-800">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 콘텐츠 정보 */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">{content.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{content.rating}</span>
                </div>
                <span className="text-gray-300">{content.year}</span>
                <span className="text-gray-300">{content.genre}</span>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayClick}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  재생
                </button>
                <button
                  onClick={handleBookmarkToggle}
                  className={`p-2 rounded-full border-2 transition-colors ${
                    isBookmarked
                      ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                      : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {isBookmarked ? <Heart className="w-5 h-5 fill-current" /> : <Plus className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleRatingClick}
                  className="p-2 rounded-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReviewClick}
                  className="p-2 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="border-b border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                상세 정보
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                리뷰
              </button>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">줄거리</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {content.description || '이 콘텐츠에 대한 상세한 설명이 곧 제공될 예정입니다.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="text-gray-400 w-20">장르:</span>
                        <span className="text-white">{content.genre}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-20">연도:</span>
                        <span className="text-white">{content.year}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-20">평점:</span>
                        <span className="text-white">{content.rating}/10</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-20">유형:</span>
                        <span className="text-white">{content.type === 'movie' ? '영화' : 'TV 시리즈'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">리뷰</h3>
                  {user && (
                    <button
                      onClick={handleReviewClick}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      리뷰 작성
                    </button>
                  )}
                </div>
                <ReviewList contentId={content.id} contentType={content.type} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 비디오 플레이어 */}
      {isVideoOpen && (
        <VideoPlayer
          url={getVideoUrl(content)}
          title={content.title}
          onClose={() => setIsVideoOpen(false)}
          autoPlay={true}
        />
      )}

      {/* 평점 모달 */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        contentId={content.id}
        contentTitle={content.title}
        contentPoster={content.image}
      />

      {/* 리뷰 모달 */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        contentId={content.id}
        contentTitle={content.title}
        contentPoster={content.image}
        contentType={content.type}
      />
    </>
  );
} 
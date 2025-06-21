// 평점 매기기 모달 컴포넌트
import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, ratingService } from '../services/firebase';
import { useStore } from '../store/useStore';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  contentTitle: string;
  contentPoster: string;
}

/**
 * 평점 매기기 모달 컴포넌트
 * 사용자가 콘텐츠에 평점을 매길 수 있습니다
 */
export default function RatingModal({
  isOpen,
  onClose,
  contentId,
  contentTitle,
  contentPoster,
}: RatingModalProps) {
  const [user] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useStore();

  // 기존 평점 불러오기
  useEffect(() => {
    if (isOpen && user && contentId) {
      loadCurrentRating();
    }
  }, [isOpen, user, contentId]);

  // 현재 사용자의 평점 불러오기
  const loadCurrentRating = async () => {
    if (!user) return;

    try {
      const userRating = await ratingService.getUserRating(user.uid, contentId);
      setCurrentRating(userRating);
      setRating(userRating || 0);
    } catch (error) {
      console.error('Error loading rating:', error);
    }
  };

  // 평점 제출 핸들러
  const handleSubmitRating = async () => {
    if (!user || rating === 0) return;

    setLoading(true);
    try {
      await ratingService.rateContent(user.uid, contentId, rating);
      setCurrentRating(rating);
      addToast(
        currentRating 
          ? `평점이 ${rating}점으로 수정되었습니다.` 
          : `${rating}점으로 평점을 매겼습니다.`,
        'success'
      );
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
      addToast('평점 등록 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    setRating(currentRating || 0);
    setHoverRating(0);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        {/* 콘텐츠 정보 */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={contentPoster}
            alt={contentTitle}
            className="w-16 h-24 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div>
            <h2 className="text-xl font-bold text-white mb-2">평점 매기기</h2>
            <p className="text-gray-300 font-medium">{contentTitle}</p>
            {currentRating && (
              <p className="text-sm text-gray-400 mt-1">
                현재 평점: {currentRating}점
              </p>
            )}
          </div>
        </div>

        {/* 별점 선택 */}
        <div className="mb-6">
          <p className="text-gray-300 mb-4 text-center">
            이 작품에 대한 평점을 선택해주세요
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={loading}
                className="p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-500'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-400">
              {rating > 0 && `${rating}점 / 5점`}
            </span>
          </div>
        </div>

        {/* 평점 설명 */}
        <div className="mb-6">
          <div className="text-sm text-gray-400 text-center">
            {rating === 1 && '🙄 별로예요'}
            {rating === 2 && '😐 그저 그래요'}
            {rating === 3 && '😊 괜찮아요'}
            {rating === 4 && '😍 좋아요'}
            {rating === 5 && '🤩 최고예요'}
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 py-3 px-4 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmitRating}
            disabled={loading || rating === 0}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '저장 중...' : currentRating ? '평점 수정' : '평점 등록'}
          </button>
        </div>
      </div>
    </div>
  );
} 
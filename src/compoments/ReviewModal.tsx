// 리뷰 작성 모달 컴포넌트
import React, { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, reviewService } from '../services/firebase';
import { useStore } from '../store/useStore';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  contentTitle: string;
  contentPoster: string;
  contentType: 'movie' | 'tv';
}

/**
 * 리뷰 작성 모달 컴포넌트
 * 사용자가 콘텐츠에 대한 리뷰를 작성할 수 있습니다
 */
export default function ReviewModal({
  isOpen,
  onClose,
  contentId,
  contentTitle,
  contentPoster,
  contentType,
}: ReviewModalProps) {
  const [user] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useStore();

  // 리뷰 제출 핸들러
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0 || !title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await reviewService.createReview(
        user.uid,
        user.displayName || '익명 사용자',
        user.photoURL,
        contentId,
        contentType,
        rating,
        title.trim(),
        content.trim()
      );

      addToast('리뷰가 성공적으로 등록되었습니다!', 'success');
      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      addToast('리뷰 등록 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
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
            <h2 className="text-xl font-bold text-white mb-2">리뷰 작성</h2>
            <p className="text-gray-300 font-medium">{contentTitle}</p>
          </div>
        </div>

        {/* 리뷰 폼 */}
        <form onSubmit={handleSubmitReview} className="space-y-6">
          {/* 별점 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              평점 *
            </label>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  disabled={loading}
                  className="p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-500'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {rating === 1 && '🙄 별로예요'}
              {rating === 2 && '😐 그저 그래요'}
              {rating === 3 && '😊 괜찮아요'}
              {rating === 4 && '😍 좋아요'}
              {rating === 5 && '🤩 최고예요'}
            </div>
          </div>

          {/* 리뷰 제목 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              리뷰 제목 *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="리뷰 제목을 입력하세요"
              maxLength={100}
              required
              disabled={loading}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {title.length}/100
            </div>
          </div>

          {/* 리뷰 내용 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              리뷰 내용 *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              placeholder="이 작품에 대한 자세한 감상을 작성해주세요"
              rows={6}
              maxLength={1000}
              required
              disabled={loading}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {content.length}/1000
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 py-3 px-4 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0 || !title.trim() || !content.trim()}
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                '리뷰 등록'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
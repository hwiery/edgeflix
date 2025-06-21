// 리뷰 목록 컴포넌트
import React, { useState, useEffect } from 'react';
import { Star, Heart, User, Calendar } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, reviewService, Review } from '../services/firebase';
import { useStore } from '../store/useStore';

interface ReviewListProps {
  contentId: string;
  contentType: 'movie' | 'tv';
}

/**
 * 리뷰 목록 컴포넌트
 * 콘텐츠에 대한 리뷰들을 표시하고 좋아요 기능을 제공합니다
 */
export default function ReviewList({ contentId, contentType }: ReviewListProps) {
  const [user] = useAuthState(auth);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [likingReviews, setLikingReviews] = useState<Set<string>>(new Set());
  const { addToast } = useStore();

  // 리뷰 목록 불러오기
  useEffect(() => {
    loadReviews();
  }, [contentId, contentType]);

  // 리뷰 목록 로드
  const loadReviews = async () => {
    try {
      const reviewList = await reviewService.getReviewsByContent(contentId, contentType);
      setReviews(reviewList);
    } catch (error) {
      console.error('Error loading reviews:', error);
      addToast('리뷰를 불러오는 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 좋아요 토글
  const handleLikeReview = async (reviewId: string) => {
    if (!user || likingReviews.has(reviewId)) return;

    setLikingReviews(prev => new Set(prev).add(reviewId));

    try {
      const isLiked = await reviewService.toggleReviewLike(reviewId, user.uid);
      
      // 리뷰 목록 업데이트
      setReviews(prevReviews =>
        prevReviews.map(review => {
          if (review.id === reviewId) {
            const likedBy = review.likedBy || [];
            const updatedLikedBy = isLiked
              ? [...likedBy, user.uid]
              : likedBy.filter(id => id !== user.uid);
            
            return {
              ...review,
              likedBy: updatedLikedBy,
              likes: updatedLikedBy.length,
            };
          }
          return review;
        })
      );
    } catch (error) {
      console.error('Error liking review:', error);
      addToast('좋아요 처리 중 오류가 발생했습니다.', 'error');
    } finally {
      setLikingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">아직 리뷰가 없습니다</p>
          <p className="text-sm">첫 번째 리뷰를 작성해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">
        리뷰 ({reviews.length})
      </h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 rounded-lg p-6">
            {/* 리뷰 헤더 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {review.userPhoto ? (
                  <img
                    src={review.userPhoto}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                )}
                <div>
                  <h4 className="text-white font-medium">{review.userName}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 리뷰 내용 */}
            <div className="mb-4">
              <h5 className="text-white font-medium mb-2">{review.title}</h5>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {review.content}
              </p>
            </div>

            {/* 리뷰 액션 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLikeReview(review.id)}
                disabled={!user || likingReviews.has(review.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors disabled:cursor-not-allowed ${
                  user && review.likedBy?.includes(user.uid)
                    ? 'text-red-400 bg-red-400/10'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    user && review.likedBy?.includes(user.uid) ? 'fill-current' : ''
                  }`}
                />
                <span>{review.likes || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
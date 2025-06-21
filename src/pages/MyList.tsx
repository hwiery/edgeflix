import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import Header from '../compoments/Header';
import Footer from '../compoments/Footer';
import ContentCard from '../compoments/ContextCard';
import { useStore } from '../store/useStore';

/**
 * 내가 찜한 콘텐츠 페이지
 */
const MyList = () => {
  const navigate = useNavigate();
  const { bookmarkedContent } = useStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* 페이지 헤더 */}
      <div className="pt-24 pb-8 px-4 md:px-8 lg:px-12">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold">내가 찜한 콘텐츠</h1>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="mb-8">
          <p className="text-gray-400">
            총 <span className="text-white font-semibold">{bookmarkedContent.length}개</span>의 콘텐츠를 찜했습니다.
          </p>
        </div>
      </div>

      {/* 콘텐츠 목록 */}
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        {bookmarkedContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {bookmarkedContent.map((content) => (
              <div key={content.id} className="w-full">
                <ContentCard content={content} />
              </div>
            ))}
          </div>
        ) : (
          /* 빈 상태 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-400">
              아직 찜한 콘텐츠가 없습니다
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              마음에 드는 영화나 드라마를 찾아 ❤️ 버튼을 눌러 찜목록에 추가해보세요!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              콘텐츠 둘러보기
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyList; 
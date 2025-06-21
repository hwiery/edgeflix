import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Film, Search } from 'lucide-react';

/**
 * 404 Not Found 페이지
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 애니메이션 */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-4">
            404
          </div>
          <div className="flex justify-center space-x-2 mb-6">
            <Film className="w-8 h-8 text-red-500 animate-pulse" />
            <Film className="w-8 h-8 text-red-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <Film className="w-8 h-8 text-red-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* 메시지 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            앗! 페이지를 찾을 수 없어요
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-gray-500">
            대신 다른 멋진 콘텐츠들을 둘러보는 건 어떨까요?
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>홈으로 가기</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전 페이지</span>
          </button>
        </div>

        {/* 추천 액션 */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            이런 것들은 어떠세요?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left"
            >
              <div className="font-medium mb-1">🔥 인기 콘텐츠</div>
              <div className="text-gray-400">지금 가장 핫한 콘텐츠들</div>
            </button>
            
            <button
              onClick={() => navigate('/my-list')}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left"
            >
              <div className="font-medium mb-1">❤️ 찜한 목록</div>
              <div className="text-gray-400">내가 저장한 콘텐츠들</div>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left"
            >
              <div className="font-medium mb-1">🆕 최신 추가</div>
              <div className="text-gray-400">새로 업데이트된 콘텐츠</div>
            </button>
          </div>
        </div>

        {/* EdgeFlix 로고 */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-2xl font-bold text-red-500 mb-2">EDGEFLIX</div>
          <p className="text-gray-500 text-sm">
            당신의 취향에 맞는 최고의 콘텐츠를 발견하세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

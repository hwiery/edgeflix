import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, List } from 'lucide-react';
import Header from '../compoments/Header';
import Footer from '../compoments/Footer';
import ContentCard from '../compoments/ContextCard';
import { Content } from '../store/useStore';

/**
 * 장르별 콘텐츠 페이지
 */
const Genre = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const genre = searchParams.get('category') || 'all';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popularity');

  // 장르별 콘텐츠 데이터 (실제로는 API에서 가져올 데이터)
  const genreData: Record<string, { title: string; description: string; content: Content[] }> = {
    action: {
      title: "액션",
      description: "스릴 넘치는 액션과 모험으로 가득한 콘텐츠",
      content: [
        {
          id: 1,
          title: "Cyber Nights",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
          genre: "Action",
          year: "2024",
          rating: "8.9",
          description: "사이버 세계의 밤을 배경으로 한 액션 영화",
          duration: "2시간 12분"
        },
        {
          id: 2,
          title: "Night Strike",
          image: "https://images.unsplash.com/photo-1509347528160-9a57ecf0c32c?w=500&h=750&fit=crop",
          genre: "Action",
          year: "2024",
          rating: "8.7",
          description: "밤의 암살자들이 펼치는 치열한 액션",
          duration: "1시간 58분"
        }
      ]
    },
    drama: {
      title: "드라마",
      description: "감동적이고 깊이 있는 인간 드라마",
      content: [
        {
          id: 3,
          title: "Starlight",
          image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&h=750&fit=crop",
          genre: "Drama",
          year: "2023",
          rating: "8.8",
          description: "별빛 아래에서 펼쳐지는 감동적인 드라마",
          duration: "2시간 15분"
        },
        {
          id: 4,
          title: "Autumn Leaves",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=750&fit=crop",
          genre: "Drama",
          year: "2023",
          rating: "8.5",
          description: "가을 단풍처럼 아름다운 이야기",
          duration: "1시간 52분"
        }
      ]
    },
    thriller: {
      title: "스릴러",
      description: "긴장감 넘치는 심리 스릴러와 서스펜스",
      content: [
        {
          id: 5,
          title: "Digital Dreams",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=750&fit=crop",
          genre: "Thriller",
          year: "2024",
          rating: "9.0",
          description: "디지털 세계에서 벌어지는 스릴러",
          duration: "1시간 58분"
        },
        {
          id: 6,
          title: "Dark Shadows",
          image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=750&fit=crop",
          genre: "Thriller",
          year: "2024",
          rating: "8.6",
          description: "어둠 속에서 펼쳐지는 미스터리",
          duration: "2시간 3분"
        }
      ]
    },
    scifi: {
      title: "SF",
      description: "미래와 상상력이 만나는 공상과학 세계",
      content: [
        {
          id: 7,
          title: "Stellar Journey",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop",
          genre: "Sci-Fi",
          year: "2024",
          rating: "9.1",
          description: "별들 사이의 여행을 그린 공상과학 영화",
          duration: "2시간 35분"
        },
        {
          id: 8,
          title: "Time Paradox",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop",
          genre: "Sci-Fi",
          year: "2023",
          rating: "8.9",
          description: "시간 여행의 패러독스를 다룬 SF 걸작",
          duration: "2시간 18분"
        }
      ]
    },
    horror: {
      title: "호러",
      description: "오싹하고 무서운 공포 콘텐츠",
      content: [
        {
          id: 9,
          title: "Urban Legends",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
          genre: "Horror",
          year: "2024",
          rating: "8.3",
          description: "도시에서 전해지는 무서운 전설들",
          duration: "1시간 42분"
        },
        {
          id: 10,
          title: "Midnight Terror",
          image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=750&fit=crop",
          genre: "Horror",
          year: "2024",
          rating: "8.1",
          description: "자정에 시작되는 공포 이야기",
          duration: "1시간 55분"
        }
      ]
    }
  };

  // 현재 장르 데이터 가져오기
  const currentGenre = genreData[genre] || {
    title: "모든 장르",
    description: "다양한 장르의 콘텐츠를 만나보세요",
    content: Object.values(genreData).flatMap(g => g.content)
  };

  // 정렬된 콘텐츠
  const sortedContent = useMemo(() => {
    const content = [...currentGenre.content];
    
    switch (sortBy) {
      case 'rating':
        return content.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case 'year':
        return content.sort((a, b) => b.year.localeCompare(a.year));
      case 'title':
        return content.sort((a, b) => a.title.localeCompare(b.title));
      default: // popularity
        return content;
    }
  }, [currentGenre.content, sortBy]);

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
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {currentGenre.title}
            </h1>
            <p className="text-gray-400">
              {currentGenre.description}
            </p>
            <p className="text-gray-500 mt-1">
              총 <span className="text-white font-semibold">{sortedContent.length}개</span>의 콘텐츠
            </p>
          </div>
        </div>

        {/* 컨트롤바 */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 보기 모드 토글 */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="그리드 보기"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="리스트 보기"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="popularity">인기순</option>
              <option value="rating">평점순</option>
              <option value="year">최신순</option>
              <option value="title">제목순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 콘텐츠 그리드/리스트 */}
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        {sortedContent.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
              : "space-y-4"
          }>
            {sortedContent.map((content) => (
              viewMode === 'grid' ? (
                <div key={content.id} className="w-full">
                  <ContentCard content={content} />
                </div>
              ) : (
                <div key={content.id} className="flex bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                  <div className="w-24 h-36 flex-shrink-0 mr-4">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span>{content.year}</span>
                      <span>{content.genre}</span>
                      <span>⭐ {content.rating}</span>
                      <span>{content.duration}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{content.description}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          /* 콘텐츠 없음 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-400">
              콘텐츠를 찾을 수 없습니다
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              해당 장르의 콘텐츠가 아직 준비되지 않았습니다.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Genre; 
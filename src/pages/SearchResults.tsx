import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, SlidersHorizontal, X } from 'lucide-react';
import Header from '../compoments/Header';
import Footer from '../compoments/Footer';
import ContentCard from '../compoments/ContextCard';
import { useStore, Content } from '../store/useStore';

/**
 * 검색 결과 페이지
 */
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // 전체 콘텐츠 가져오기 (실제로는 API에서 가져올 데이터)
  const allContent: Content[] = [
    // 트렌딩 콘텐츠
    {
      id: 1,
      title: "The Matrix Resurrections",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=750&fit=crop",
      genre: "Sci-Fi",
      year: "2021",
      rating: "8.5",
      description: "네오는 다시 한번 매트릭스의 세계와 현실 사이에서 선택해야 한다.",
      duration: "2시간 28분"
    },
    {
      id: 2,
      title: "Ocean Waves",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=750&fit=crop",
      genre: "Documentary",
      year: "2023",
      rating: "9.2",
      description: "바다의 신비로운 이야기를 담은 다큐멘터리",
      duration: "1시간 45분"
    },
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
      title: "Digital Dreams",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=750&fit=crop",
      genre: "Thriller",
      year: "2024",
      rating: "9.0",
      description: "디지털 세계에서 벌어지는 스릴러",
      duration: "1시간 58분"
    },
    {
      id: 5,
      title: "Midnight Stories",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=750&fit=crop",
      genre: "Mystery",
      year: "2023",
      rating: "8.7",
      description: "자정에 시작되는 미스터리한 이야기들",
      duration: "2시간 3분"
    },
    {
      id: 6,
      title: "Urban Legends",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
      genre: "Horror",
      year: "2024",
      rating: "8.3",
      description: "도시에서 전해지는 무서운 전설들",
      duration: "1시간 42분"
    },
    {
      id: 7,
      title: "Cyber Nights",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
      genre: "Action",
      year: "2024",
      rating: "8.9",
      description: "사이버 세계의 밤을 배경으로 한 액션 영화",
      duration: "2시간 12분"
    },
    {
      id: 8,
      title: "Ocean Deep",
      image: "https://images.unsplash.com/photo-1544551026-1a6e3749a2b0?w=500&h=750&fit=crop",
      genre: "Adventure",
      year: "2023",
      rating: "8.6",
      description: "깊은 바다 속 모험을 그린 어드벤처",
      duration: "1시간 52분"
    },
    {
      id: 9,
      title: "Stellar Journey",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop",
      genre: "Sci-Fi",
      year: "2024",
      rating: "9.1",
      description: "별들 사이의 여행을 그린 공상과학 영화",
      duration: "2시간 35분"
    },
    {
      id: 10,
      title: "Forest Whispers",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=750&fit=crop",
      genre: "Fantasy",
      year: "2023",
      rating: "8.4",
      description: "숲 속에서 들려오는 신비한 소리들",
      duration: "1시간 48분"
    }
  ];

  // 장르 목록 추출
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(allContent.map(content => content.genre))];
    return ['all', ...uniqueGenres];
  }, []);

  // 연도 목록 추출
  const years = useMemo(() => {
    const uniqueYears = [...new Set(allContent.map(content => content.year))].sort((a, b) => b.localeCompare(a));
    return ['all', ...uniqueYears];
  }, []);

  /**
   * 검색 및 필터링된 결과
   */
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // 텍스트 검색
    if (query) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(query.toLowerCase()) ||
        content.genre.toLowerCase().includes(query.toLowerCase()) ||
        content.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 장르 필터
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(content => content.genre === selectedGenre);
    }

    // 연도 필터
    if (selectedYear !== 'all') {
      filtered = filtered.filter(content => content.year === selectedYear);
    }

    // 정렬
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'year':
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance
        // 검색어가 제목에 포함된 것을 우선으로
        if (query) {
          filtered.sort((a, b) => {
            const aInTitle = a.title.toLowerCase().includes(query.toLowerCase());
            const bInTitle = b.title.toLowerCase().includes(query.toLowerCase());
            if (aInTitle && !bInTitle) return -1;
            if (!aInTitle && bInTitle) return 1;
            return 0;
          });
        }
    }

    return filtered;
  }, [query, selectedGenre, selectedYear, sortBy]);

  /**
   * 필터 초기화
   */
  const resetFilters = () => {
    setSelectedGenre('all');
    setSelectedYear('all');
    setSortBy('relevance');
  };

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
            <h1 className="text-3xl md:text-4xl font-bold">
              {query ? `"${query}" 검색 결과` : '모든 콘텐츠'}
            </h1>
            <p className="text-gray-400 mt-1">
              총 <span className="text-white font-semibold">{filteredContent.length}개</span>의 결과를 찾았습니다.
            </p>
          </div>
        </div>

        {/* 필터 및 정렬 컨트롤 */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>필터</span>
          </button>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="relevance">관련도순</option>
              <option value="rating">평점순</option>
              <option value="year">최신순</option>
              <option value="title">제목순</option>
            </select>
          </div>
        </div>

        {/* 필터 패널 */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">장르</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-red-500"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre === 'all' ? '모든 장르' : genre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">출시년도</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-red-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === 'all' ? '모든 연도' : year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  필터 초기화
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredContent.map((content) => (
              <div key={content.id} className="w-full">
                <ContentCard content={content} />
              </div>
            ))}
          </div>
        ) : (
          /* 검색 결과 없음 */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-400">
              검색 결과를 찾을 수 없습니다
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              {query ? `"${query}"에 대한 검색 결과가 없습니다.` : '조건에 맞는 콘텐츠가 없습니다.'} 
              다른 검색어나 필터를 시도해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetFilters}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                필터 초기화
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults; 
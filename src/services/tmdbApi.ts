/**
 * TMDB API 연동 서비스
 */

// TMDB API 키 (환경변수에서 가져오기)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'demo_key';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * TMDB API 응답 타입 정의
 */
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  origin_country: string[];
  original_language: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

/**
 * Content 타입과 TMDB 타입 변환
 */
export const tmdbToContent = (item: TMDBMovie | TMDBTVShow): any => {
  const isMovie = 'title' in item;
  
  return {
    id: item.id,
    title: isMovie ? item.title : (item as TMDBTVShow).name,
    image: item.poster_path 
      ? `${IMAGE_BASE_URL}/w500${item.poster_path}`
      : 'https://images.unsplash.com/photo-1489599033881-f476b91a9f8a?w=500&h=750&fit=crop',
    genre: isMovie ? 'Movie' : 'TV Show',
    year: isMovie 
      ? item.release_date?.split('-')[0] || '2024'
      : (item as TMDBTVShow).first_air_date?.split('-')[0] || '2024',
    rating: item.vote_average.toFixed(1),
    description: item.overview || '설명이 없습니다.',
    duration: isMovie ? '2시간' : '시즌 1'
  };
};

/**
 * TMDB API 서비스 클래스
 */
class TMDBApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_KEY;
    this.baseUrl = BASE_URL;
  }

  /**
   * API 요청 공통 함수
   */
  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('api_key', this.apiKey);
    url.searchParams.append('language', 'ko-KR');
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('TMDB API 요청 실패:', error);
      throw error;
    }
  }

  /**
   * 트렌딩 콘텐츠 가져오기
   */
  async getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TMDBMovie | TMDBTVShow>> {
    return this.request(`/trending/${mediaType}/${timeWindow}`);
  }

  /**
   * 인기 영화 가져오기
   */
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.request('/movie/popular', { page: page.toString() });
  }

  /**
   * 인기 TV 프로그램 가져오기
   */
  async getPopularTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.request('/tv/popular', { page: page.toString() });
  }

  /**
   * 최신 영화 가져오기
   */
  async getLatestMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.request('/movie/now_playing', { page: page.toString() });
  }

  /**
   * 높은 평점 영화 가져오기
   */
  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.request('/movie/top_rated', { page: page.toString() });
  }

  /**
   * 검색 기능
   */
  async searchMulti(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie | TMDBTVShow>> {
    return this.request('/search/multi', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  /**
   * 영화 검색
   */
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.request('/search/movie', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  /**
   * TV 프로그램 검색
   */
  async searchTVShows(query: string, page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.request('/search/tv', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  /**
   * 장르별 영화 가져오기
   */
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.request('/discover/movie', { 
      with_genres: genreId.toString(),
      page: page.toString(),
      sort_by: 'popularity.desc'
    });
  }

  /**
   * 장르별 TV 프로그램 가져오기
   */
  async getTVShowsByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.request('/discover/tv', { 
      with_genres: genreId.toString(),
      page: page.toString(),
      sort_by: 'popularity.desc'
    });
  }

  /**
   * 영화 장르 목록 가져오기
   */
  async getMovieGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.request('/genre/movie/list');
  }

  /**
   * TV 프로그램 장르 목록 가져오기
   */
  async getTVGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.request('/genre/tv/list');
  }

  /**
   * 이미지 URL 생성
   */
  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) {
      return 'https://images.unsplash.com/photo-1489599033881-f476b91a9f8a?w=500&h=750&fit=crop';
    }
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  /**
   * API 키 유효성 검사
   */
  isApiKeyValid(): boolean {
    return this.apiKey !== 'demo_key' && this.apiKey?.length > 0;
  }
}

// 싱글톤 인스턴스 내보내기
export const tmdbApi = new TMDBApiService();

/**
 * React Query 사용을 위한 쿼리 키 상수
 */
export const TMDB_QUERY_KEYS = {
  trending: (type: string, timeWindow: string) => ['trending', type, timeWindow],
  popularMovies: (page: number) => ['popular', 'movies', page],
  popularTVShows: (page: number) => ['popular', 'tv', page],
  latestMovies: (page: number) => ['latest', 'movies', page],
  topRatedMovies: (page: number) => ['topRated', 'movies', page],
  searchMulti: (query: string, page: number) => ['search', 'multi', query, page],
  searchMovies: (query: string, page: number) => ['search', 'movies', query, page],
  searchTVShows: (query: string, page: number) => ['search', 'tv', query, page],
  moviesByGenre: (genreId: number, page: number) => ['movies', 'genre', genreId, page],
  tvByGenre: (genreId: number, page: number) => ['tv', 'genre', genreId, page],
  movieGenres: () => ['genres', 'movies'],
  tvGenres: () => ['genres', 'tv']
} as const; 
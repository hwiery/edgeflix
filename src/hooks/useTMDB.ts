import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { tmdbApi, TMDBResponse, TMDBMovie, TMDBTVShow, tmdbToContent, TMDB_QUERY_KEYS } from '../services/tmdbApi';
import { Content } from '../store/useStore';

/**
 * TMDB API 데이터를 위한 커스텀 훅들
 */

/**
 * 트렌딩 콘텐츠 훅
 */
export const useTrending = (
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'week'
): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.trending(mediaType, timeWindow),
    queryFn: async () => {
      const response = await tmdbApi.getTrending(mediaType, timeWindow);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 30, // 30분
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 인기 영화 훅
 */
export const usePopularMovies = (page: number = 1): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.popularMovies(page),
    queryFn: async () => {
      const response = await tmdbApi.getPopularMovies(page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 인기 TV 프로그램 훅
 */
export const usePopularTVShows = (page: number = 1): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.popularTVShows(page),
    queryFn: async () => {
      const response = await tmdbApi.getPopularTVShows(page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 최신 영화 훅
 */
export const useLatestMovies = (page: number = 1): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.latestMovies(page),
    queryFn: async () => {
      const response = await tmdbApi.getLatestMovies(page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 10, // 최신 데이터는 더 자주 업데이트
    gcTime: 1000 * 60 * 30,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 높은 평점 영화 훅
 */
export const useTopRatedMovies = (page: number = 1): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.topRatedMovies(page),
    queryFn: async () => {
      const response = await tmdbApi.getTopRatedMovies(page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 60, // 평점은 변동이 적으므로 1시간
    gcTime: 1000 * 60 * 120,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 검색 훅
 */
export const useSearchMulti = (
  query: string,
  page: number = 1,
  enabled: boolean = true
): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.searchMulti(query, page),
    queryFn: async () => {
      const response = await tmdbApi.searchMulti(query, page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 10, // 검색 결과는 10분
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: enabled && query.length > 0 && tmdbApi.isApiKeyValid()
  });
};

/**
 * 장르별 영화 훅
 */
export const useMoviesByGenre = (
  genreId: number,
  page: number = 1,
  enabled: boolean = true
): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.moviesByGenre(genreId, page),
    queryFn: async () => {
      const response = await tmdbApi.getMoviesByGenre(genreId, page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    enabled: enabled && tmdbApi.isApiKeyValid()
  });
};

/**
 * 장르별 TV 프로그램 훅
 */
export const useTVShowsByGenre = (
  genreId: number,
  page: number = 1,
  enabled: boolean = true
): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.tvByGenre(genreId, page),
    queryFn: async () => {
      const response = await tmdbApi.getTVShowsByGenre(genreId, page);
      return response.results.map(tmdbToContent);
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    enabled: enabled && tmdbApi.isApiKeyValid()
  });
};

/**
 * 영화 장르 목록 훅
 */
export const useMovieGenres = (): UseQueryResult<{id: number, name: string}[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.movieGenres(),
    queryFn: async () => {
      const response = await tmdbApi.getMovieGenres();
      return response.genres;
    },
    staleTime: 1000 * 60 * 60 * 24, // 장르는 거의 변하지 않으므로 24시간
    gcTime: 1000 * 60 * 60 * 48,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * TV 장르 목록 훅
 */
export const useTVGenres = (): UseQueryResult<{id: number, name: string}[], Error> => {
  return useQuery({
    queryKey: TMDB_QUERY_KEYS.tvGenres(),
    queryFn: async () => {
      const response = await tmdbApi.getTVGenres();
      return response.genres;
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 48,
    retry: 2,
    enabled: tmdbApi.isApiKeyValid()
  });
};

/**
 * 더미 데이터 (API 키가 없을 때 사용)
 */
const getDummyContent = (type: string): Content[] => {
  return [
    {
      id: 1,
      title: `${type} Sample 1`,
      image: "https://images.unsplash.com/photo-1489599856216-4d5c4ec77ce9?w=500&h=750&fit=crop",
      genre: "Drama",
      year: "2024",
      rating: "8.5",
      description: `TMDB API 키가 설정되지 않아 더미 데이터를 표시합니다. ${type} 카테고리의 샘플 콘텐츠입니다.`,
      duration: "2시간 15분"
    },
    {
      id: 2,
      title: `${type} Sample 2`,
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
      genre: "Action",
      year: "2024",
      rating: "7.8",
      description: `TMDB API 키가 설정되지 않아 더미 데이터를 표시합니다. ${type} 카테고리의 샘플 콘텐츠입니다.`,
      duration: "1시간 58분"
    },
    {
      id: 3,
      title: `${type} Sample 3`,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
      genre: "Thriller",
      year: "2023",
      rating: "8.9",
      description: `TMDB API 키가 설정되지 않아 더미 데이터를 표시합니다. ${type} 카테고리의 샘플 콘텐츠입니다.`,
      duration: "2시간 3분"
    }
  ];
};

/**
 * API 키 없을 때 더미 데이터 훅들
 */
export const useDummyTrending = (): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: ['dummy', 'trending'],
    queryFn: async () => getDummyContent('트렌딩'),
    staleTime: Infinity,
    enabled: !tmdbApi.isApiKeyValid()
  });
};

export const useDummyPopularMovies = (): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: ['dummy', 'popular', 'movies'],
    queryFn: async () => getDummyContent('인기 영화'),
    staleTime: Infinity,
    enabled: !tmdbApi.isApiKeyValid()
  });
};

export const useDummyPopularTVShows = (): UseQueryResult<Content[], Error> => {
  return useQuery({
    queryKey: ['dummy', 'popular', 'tv'],
    queryFn: async () => getDummyContent('인기 TV 프로그램'),
    staleTime: Infinity,
    enabled: !tmdbApi.isApiKeyValid()
  });
}; 
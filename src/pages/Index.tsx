import React from 'react';
import Header from '../compoments/Header';
import HeroSection from '../compoments/HeroSection';
import ContentRow from '../compoments/ContextRow';
import Footer from '../compoments/Footer';
import { Content } from '../store/useStore';

const Index = () => {
  // 트렌딩 콘텐츠 데이터
  const trendingContent: Content[] = [
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
    }
  ];

  // 추천 콘텐츠 데이터
  const recommendedContent: Content[] = [
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
    },
    {
      id: 11,
      title: "Time Loops",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop",
      genre: "Sci-Fi",
      year: "2024",
      rating: "8.8",
      description: "시간의 루프에 갇힌 사람들의 이야기",
      duration: "2시간 7분"
    }
  ];

  // 최신 추가 콘텐츠 데이터
  const newReleases: Content[] = [
    {
      id: 12,
      title: "Shadow Games",
      image: "https://images.unsplash.com/photo-1544551026-1a6e3749a2b0?w=500&h=750&fit=crop",
      genre: "Action",
      year: "2024",
      rating: "8.7",
      description: "그림자 속에서 벌어지는 위험한 게임",
      duration: "1시간 55분"
    },
    {
      id: 13,
      title: "Quantum Realm",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=750&fit=crop",
      genre: "Sci-Fi",
      year: "2024",
      rating: "9.3",
      description: "양자 세계의 비밀을 파헤치는 과학 스릴러",
      duration: "2시간 18분"
    },
    {
      id: 14,
      title: "Desert Winds",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop",
      genre: "Drama",
      year: "2024",
      rating: "8.5",
      description: "사막의 바람이 전하는 감동적인 이야기",
      duration: "2시간 1분"
    },
    {
      id: 15,
      title: "Neon Dreams",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
      genre: "Cyberpunk",
      year: "2024",
      rating: "8.9",
      description: "네온사인이 빛나는 미래 도시의 꿈",
      duration: "2시간 23분"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        <ContentRow 
          title="지금 뜨는 콘텐츠" 
          content={trendingContent}
        />
        <ContentRow 
          title="내가 좋아할 만한 콘텐츠" 
          content={recommendedContent}
        />
        <ContentRow 
          title="최신 추가" 
          content={newReleases}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

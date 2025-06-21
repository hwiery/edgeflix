import React from 'react';
import { Play, Plus, Info } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 max-w-2xl mt-16">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-red-600/20 border border-red-600/30 rounded-full">
            <span className="text-red-400 text-sm font-medium">EDGEFLIX 오리지널</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            The Matrix
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Resurrections
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            네오는 다시 한번 매트릭스의 세계와 현실 사이에서 선택해야 한다. 
            진실을 찾기 위한 여정이 다시 시작된다.
          </p>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-gray-700 px-2 py-1 rounded">2021</span>
            <span>2시간 28분</span>
            <span className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              8.5
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
              <Play className="w-5 h-5 fill-current" />
              <span>재생</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-700/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600/80 transition-all duration-200 backdrop-blur-sm">
              <Plus className="w-5 h-5" />
              <span>내가 찜한 콘텐츠</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-transparent border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:border-white/50 transition-all duration-200">
              <Info className="w-5 h-5" />
              <span>상세 정보</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

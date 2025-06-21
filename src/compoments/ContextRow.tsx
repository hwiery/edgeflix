import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContextCard';
import { Content } from '../store/useStore';

interface ContentRowProps {
  title: string;
  content: Content[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, content }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * 가로 스크롤 핸들러
   */
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-12">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-4 px-4 md:px-0">{title}</h2>
      
      {/* Content Container */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          aria-label="이전 콘텐츠 보기"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          aria-label="다음 콘텐츠 보기"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;

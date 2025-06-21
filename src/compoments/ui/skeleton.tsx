import { cn } from "../../lib/utils"

/**
 * 스켈레톤 컴포넌트 - 로딩 중 placeholder 역할
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-800/60 dark:bg-muted/60",
        className
      )}
      {...props}
    />
  )
}

/**
 * 콘텐츠 카드 스켈레톤
 */
function ContentCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900">
      {/* 이미지 스켈레톤 */}
      <div className="aspect-[2/3] bg-gray-800 animate-pulse" />
      
      {/* 호버 오버레이 스켈레톤 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-2" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 콘텐츠 로우 스켈레톤
 */
function ContentRowSkeleton() {
  return (
    <div className="mb-8">
      <div className="px-4 md:px-8 lg:px-12 mb-4">
        <Skeleton className="h-6 w-48 mb-2" />
      </div>
      
      <div className="px-4 md:px-8 lg:px-12">
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48">
              <ContentCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 히어로 섹션 스켈레톤
 */
function HeroSectionSkeleton() {
  return (
    <div className="relative h-screen bg-gray-900">
      {/* 배경 이미지 스켈레톤 */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
      
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* 콘텐츠 스켈레톤 */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5 mb-8" />
          
          <div className="flex space-x-4">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 검색 결과 페이지 스켈레톤
 */
function SearchResultsSkeleton() {
  return (
    <div className="pt-24 pb-8 px-4 md:px-8 lg:px-12">
      {/* 헤더 스켈레톤 */}
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      
      {/* 필터 컨트롤 스켈레톤 */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* 그리드 스켈레톤 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * 페이지 로딩 스켈레톤
 */
function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20">
        <HeroSectionSkeleton />
        <ContentRowSkeleton />
        <ContentRowSkeleton />
        <ContentRowSkeleton />
      </div>
    </div>
  );
}

export { 
  Skeleton, 
  ContentCardSkeleton, 
  ContentRowSkeleton, 
  HeroSectionSkeleton, 
  SearchResultsSkeleton,
  PageLoadingSkeleton 
};

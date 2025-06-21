import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface VideoPlayerProps {
  /**
   * 비디오 URL (YouTube, Vimeo, 직접 파일 등)
   */
  url: string;
  /**
   * 비디오 제목
   */
  title: string;
  /**
   * 플레이어 닫기 콜백
   */
  onClose: () => void;
  /**
   * 자동 재생 여부
   */
  autoPlay?: boolean;
  /**
   * 초기 음량 (0-1)
   */
  initialVolume?: number;
}

/**
 * 넷플릭스 스타일 비디오 플레이어 컴포넌트
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  onClose,
  autoPlay = true,
  initialVolume = 0.8
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 플레이어 상태
  const [playing, setPlaying] = useState(autoPlay);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');

  // 컨트롤 자동 숨김
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout>();

  /**
   * 마우스 움직임 시 컨트롤 표시
   */
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
    
    setControlsTimeout(timeout);
  };

  /**
   * 재생/일시정지 토글
   */
  const togglePlay = () => {
    setPlaying(!playing);
  };

  /**
   * 음소거 토글
   */
  const toggleMute = () => {
    setMuted(!muted);
  };

  /**
   * 전체화면 토글
   */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  /**
   * 10초 뒤로
   */
  const seekBackward = () => {
    const currentTime = played * duration;
    const newTime = Math.max(0, currentTime - 10);
    playerRef.current?.seekTo(newTime / duration);
  };

  /**
   * 10초 앞으로
   */
  const seekForward = () => {
    const currentTime = played * duration;
    const newTime = Math.min(duration, currentTime + 10);
    playerRef.current?.seekTo(newTime / duration);
  };

  /**
   * 시간 포맷팅 (초 → MM:SS)
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * 진행률 바 클릭 시 해당 위치로 이동
   */
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    playerRef.current?.seekTo(clickPercent);
  };

  /**
   * 키보드 단축키 처리
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(1, prev + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [playing, volume]);

  /**
   * 전체화면 변경 감지
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  /**
   * 컴포넌트 언마운트 시 타이머 정리
   */
  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${
        fullscreen ? 'cursor-none' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* 닫기 버튼 (전체화면이 아닐 때만) */}
      {!fullscreen && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          aria-label="플레이어 닫기"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* 비디오 플레이어 */}
      <div className="relative w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          onProgress={({ played, loaded }) => {
            setPlayed(played);
            setLoaded(loaded);
          }}
          onDuration={setDuration}
          onEnded={() => setPlaying(false)}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0
              }
            }
          }}
        />

        {/* 컨트롤 오버레이 */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 상단 정보 */}
          <div className="absolute top-0 left-0 right-0 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          </div>

          {/* 중앙 재생 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center space-x-8">
              <button
                onClick={seekBackward}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-colors"
                aria-label="10초 뒤로"
              >
                <SkipBack className="w-8 h-8 text-white" />
              </button>
              
              <button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-colors"
                aria-label={playing ? "일시정지" : "재생"}
              >
                {playing ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white fill-current" />
                )}
              </button>
              
              <button
                onClick={seekForward}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-colors"
                aria-label="10초 앞으로"
              >
                <SkipForward className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          {/* 하단 컨트롤 */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* 진행률 바 */}
            <div className="mb-4">
              <div
                className="relative h-2 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all"
                onClick={handleProgressClick}
              >
                {/* 로드된 부분 */}
                <div
                  className="absolute top-0 left-0 h-full bg-white/40 rounded-full"
                  style={{ width: `${loaded * 100}%` }}
                />
                {/* 재생된 부분 */}
                <div
                  className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                  style={{ width: `${played * 100}%` }}
                />
                {/* 썸네일 */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-white"
                  style={{ left: `${played * 100}%`, marginLeft: '-8px' }}
                />
              </div>
            </div>

            {/* 컨트롤 버튼들 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* 재생/정지 */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={playing ? "일시정지" : "재생"}
                >
                  {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
                </button>

                {/* 음량 */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label={muted ? "음소거 해제" : "음소거"}
                  >
                    {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>

                {/* 시간 */}
                <div className="text-white text-sm">
                  {formatTime(played * duration)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* 설정 */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="설정"
                  >
                    <Settings className="w-6 h-6" />
                  </button>

                  {/* 설정 메뉴 */}
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-48">
                      <div className="text-white">
                        <div className="mb-3">
                          <label className="block text-sm mb-1">재생 속도</label>
                          <select
                            value={playbackRate}
                            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                            className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
                          >
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x (기본)</option>
                            <option value={1.25}>1.25x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-1">화질</label>
                          <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
                          >
                            <option value="auto">자동</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                            <option value="360p">360p</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 전체화면 */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={fullscreen ? "전체화면 해제" : "전체화면"}
                >
                  {fullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 키보드 단축키 안내 (일시적 표시) */}
        {showControls && (
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
            <div className="space-y-1">
              <div>스페이스바: 재생/정지</div>
              <div>← →: 10초 뒤로/앞으로</div>
              <div>↑ ↓: 음량 조절</div>
              <div>F: 전체화면</div>
              <div>ESC: 닫기</div>
            </div>
          </div>
        )}
      </div>

      {/* 커스텀 슬라이더 스타일 */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid white;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer; 
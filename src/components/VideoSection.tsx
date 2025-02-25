import React, { useRef, useEffect, useState } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

interface VideoSectionProps {
  currentStep: number;
  isHighValueInvestor: boolean;
}

export function VideoSection({ currentStep, isHighValueInvestor }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);

  const getVideoUrl = () => {
    if (currentStep === 1) {
      return 'https://pub-cda2548da4a2411a995b49fb5416f4ca.r2.dev/Course%20Intro%201%20Draft%201.mp4';
    } else if (currentStep === 2) {
      return 'https://pub-cda2548da4a2411a995b49fb5416f4ca.r2.dev/Course%20Intro%202%20Draft%201.mp4';
    } else if (currentStep === 3 && isHighValueInvestor) {
      return 'https://pub-cda2548da4a2411a995b49fb5416f4ca.r2.dev/Course%20Intro%203%20Draft%201.mp4';
    }
    return '';
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      setIsPlaying(false);
      setProgress(0);
      setShowControls(true);
    }
  }, [currentStep]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setShowControls(false);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * videoRef.current.duration;
    
    videoRef.current.currentTime = newTime;
    setProgress(clickPosition * 100);
  };

  return (
    <div 
      className="relative bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl mb-12 transform transition-all hover:scale-[1.02] duration-300 border border-blue-500/20 backdrop-blur-sm group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
      <div className="aspect-video flex items-center justify-center relative">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          playsInline
        >
          <source src={getVideoUrl()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="relative transform transition-all duration-300 hover:scale-110 z-20"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            {isPlaying ? (
              <PauseCircle className="w-24 h-24 text-white opacity-90 hover:opacity-100 cursor-pointer relative z-10" />
            ) : (
              <PlayCircle className="w-24 h-24 text-white opacity-90 hover:opacity-100 cursor-pointer relative z-10" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div 
            className="h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-white/80 text-sm mt-2">
            <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
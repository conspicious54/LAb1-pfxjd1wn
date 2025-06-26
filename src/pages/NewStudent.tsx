import React, { useRef, useEffect, useState } from 'react';
import { PlayCircle, PauseCircle, Calendar } from 'lucide-react';

declare global {
  interface Window {
    Calendly?: any;
  }
}

export function NewStudent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  const videoUrl = 'https://pub-cda2548da4a2411a995b49fb5416f4ca.r2.dev/Course%20Intro%201%20Draft%201.mp4';

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
      setVideoEnded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowControls(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt autoplay with sound
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowControls(false);
        })
        .catch(() => {
          // Autoplay was prevented, show controls
          setIsPlaying(false);
          setShowControls(true);
        });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    if (showCalendly && !calendlyLoaded) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setCalendlyLoaded(true);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [showCalendly, calendlyLoaded]);

  const togglePlayPause = (e?: React.MouseEvent) => {
    // If the click was on the progress bar or time display, don't toggle play/pause
    if (e?.target instanceof Element && 
        (e.target.closest('.progress-bar-container') || 
         e.target.closest('.time-display') ||
         e.target.closest('.book-call-button'))) {
      return;
    }

    if (!videoRef.current || showCalendly) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || showCalendly) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * videoRef.current.duration;
    
    videoRef.current.currentTime = newTime;
    setProgress(clickPosition * 100);
  };

  const handleBookCall = () => {
    setShowCalendly(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div 
        className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000&h=600&blur=50')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-4 animate-gradient">
              Welcome to Passion Product Formula!
            </h1>
          </div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Congratulations on taking the first step towards building your passion product business. Let's get you started with your personalized onboarding.
          </p>
        </div>

        {/* Video/Calendly Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl"></div>
          <div className="relative bg-gray-900/40 rounded-3xl shadow-2xl p-8 backdrop-blur-xl border border-white/10">
            
            {!showCalendly ? (
              <div className="space-y-4">
                {/* Video Title */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-100">Your Welcome Video</h2>
                  <p className="text-blue-200/80 mt-2">Watch this important message to get started</p>
                </div>

                {/* Video Player */}
                <div 
                  className="relative bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.02] duration-300 border border-blue-500/20 backdrop-blur-sm group cursor-pointer"
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => isPlaying && !videoEnded && setShowControls(false)}
                  onClick={togglePlayPause}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="aspect-video flex items-center justify-center relative">
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls Overlay */}
                    <div 
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                        showControls || videoEnded ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {/* Play/Pause Button - Only show if video hasn't ended */}
                      {!videoEnded && (
                        <div className="relative transform transition-all duration-300 hover:scale-110 z-20">
                          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                          {isPlaying ? (
                            <PauseCircle className="w-24 h-24 text-white opacity-90 hover:opacity-100 relative z-10" />
                          ) : (
                            <PlayCircle className="w-24 h-24 text-white opacity-90 hover:opacity-100 relative z-10" />
                          )}
                        </div>
                      )}

                      {/* Book Call Button - Only show when video ends */}
                      {videoEnded && (
                        <div className="book-call-button">
                          <button
                            onClick={handleBookCall}
                            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold transform hover:scale-[1.05] inline-flex items-center gap-3 text-xl"
                          >
                            <Calendar className="w-6 h-6" />
                            Book My Orientation Call
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent progress-bar-container">
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
                      <div className="flex justify-between text-white/80 text-sm mt-2 time-display">
                        <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Calendly Section */
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-blue-100 mb-4">
                    Pick Your Time for Your Onboarding Meeting
                  </h2>
                  <p className="text-blue-200/80 text-lg">
                    Schedule your personalized orientation call to get the most out of your Passion Product Formula journey.
                  </p>
                </div>
                
                {/* Calendly Embed */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <div 
                    className="calendly-inline-widget" 
                    data-url="https://calendly.com/travis-passionproduct/new-meeting" 
                    style={{ minWidth: '320px', height: '700px' }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
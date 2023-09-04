import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './vsg-skin.css'
import './video.css';
import { useLocation } from 'react-router-dom';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const chapterBarsRef = useRef([]);
  const {options, chapters, bars, onReady} = props;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const t = searchParams.get('t');

  useEffect(() => {
    if (!playerRef.current ) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);
      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
        player.currentTime(t); //get time from URL and starts the video from that time
        
        // Create chapter markers on seek bar
        chapters.forEach((chapter) => {
          const chapterBar = document.createElement('div');
          chapterBar.className = 'chapter-bar';
          chapterBar.textContent = chapter.text;
          chapterBarsRef.current.push(chapterBar);
          player.controlBar.progressControl.seekBar.el().appendChild(chapterBar);
        });

        const chaptersElement = document.createElement('div');
        chaptersElement.className = 'custom-chapters';

        // Create chapter list container video top
        chapters.forEach((chapter) => {
          const chapterButton = document.createElement('button');
          chapterButton.className = 'chapter-button';
          chapterButton.innerHTML = chapter.text;
          chapterButton.addEventListener('click', () => {
            player.currentTime(chapter.start);
          });

          chaptersElement.appendChild(chapterButton);
        });

        player.el().appendChild(chaptersElement);

        player.on('userinactive', () => {
          chaptersElement.style.display = 'none';
        });

        player.on('useractive', () => {
          chaptersElement.style.display = 'flex';
        });
        
        // Update chapter marker positions on player time update  
        playerRef.current.on('timeupdate', updateChapterBarPositions);
  
      }, [chapters, bars]);
      return () => {
        if (player) {
            player.dispose();
            playerRef.current = null;
        }
      }
      
    } else {
      const player = playerRef.current;
      player.src(options.sources);
      player.autoplay(options.autoplay);
    } 
  }, [options, videoRef, chapters, bars, onReady, t]);

  const updateChapterBarPositions = () => {
    const currentTime = playerRef.current.currentTime();
    const duration = playerRef.current.duration();
    
    chapterBarsRef.current.forEach(chapterBar => {
      const chapterStart = chapters.find(bar => bar.text === chapterBar.textContent).start;
      const chapterEnd = chapters.find(bar => bar.text === chapterBar.textContent).end;
      const markerPosition = (chapterStart / duration) * 100;
      const markerWidth = ((chapterEnd - chapterStart) / duration) * 100;
      chapterBar.style.left = `${markerPosition}%`;
      chapterBar.style.width = `${markerWidth}%`;
      chapterBar.classList.toggle('active', currentTime >= chapterStart && currentTime <= chapterEnd);
    });
  }; 

  return (
    <div data-vjs-player>
      <div ref={videoRef} className="video-js"/>
    </div>
  );
}

export default VideoJS;

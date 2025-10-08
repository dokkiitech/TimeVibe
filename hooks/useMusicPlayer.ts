import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer, AudioSource } from 'expo-audio';

interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: number | null;
}

const musicFileNames = [
  'Barely',
  'Dull',
  'Empty',
  'Epoch',
  'Fake',
  'Ice Cream',
  'Notion',
  'Something',
  'Talk',
  'Teleport',
  'Trudge',
  'Wired',
];

export const useMusicPlayer = () => {
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    currentTrack: null,
  });

  const player = useAudioPlayer();
  const previousTrackRef = useRef<number | null>(null);

  // musicフォルダ内の音源リスト
  const musicTracks = [
    require('../assets/music/Barely.mp3'),
    require('../assets/music/Dull.mp3'),
    require('../assets/music/Empty.mp3'),
    require('../assets/music/Epoch.mp3'),
    require('../assets/music/Fake.mp3'),
    require('../assets/music/Ice Cream.mp3'),
    require('../assets/music/Notion.mp3'),
    require('../assets/music/Something.mp3'),
    require('../assets/music/Talk.mp3'),
    require('../assets/music/Teleport.mp3'),
    require('../assets/music/Trudge.mp3'),
    require('../assets/music/Wired.mp3'),
  ];

  // ランダムな曲を選択（前回と重複しない）
  const getRandomTrack = useCallback((): number | null => {
    if (musicTracks.length === 0) return null;
    if (musicTracks.length === 1) return 0;

    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * musicTracks.length);
    } while (randomIndex === previousTrackRef.current);

    previousTrackRef.current = randomIndex;
    return randomIndex;
  }, [musicTracks.length]);

  // 次の曲を自動再生
  useEffect(() => {
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.isLoaded && status.didJustFinish) {
        const nextTrackIndex = getRandomTrack();
        if (nextTrackIndex !== null) {
          player.replace(musicTracks[nextTrackIndex] as AudioSource);
          player.play();
          setState((prev) => ({ ...prev, currentTrack: nextTrackIndex }));
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, musicTracks, getRandomTrack]);

  // 再生開始
  const play = useCallback(async () => {
    try {
      if (player.src) {
        player.play();
      } else {
        const trackIndex = getRandomTrack();
        if (trackIndex !== null) {
          player.replace(musicTracks[trackIndex] as AudioSource);
          player.play();
          setState((prev) => ({ ...prev, currentTrack: trackIndex }));
        }
      }

      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Error playing music:', error);
    }
  }, [player, getRandomTrack, musicTracks]);

  // 一時停止
  const pause = useCallback(async () => {
    try {
      player.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Error pausing music:', error);
    }
  }, [player]);

  return {
    isPlaying: state.isPlaying,
    play,
    pause,
    currentTrackName:
      state.currentTrack !== null ? musicFileNames[state.currentTrack] : '',
  };
};

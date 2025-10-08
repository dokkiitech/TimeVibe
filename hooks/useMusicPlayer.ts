import { useState, useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: number | null;
}

export const useMusicPlayer = () => {
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    currentTrack: null,
  });

  const soundRef = useRef<Audio.Sound | null>(null);
  const nextSoundRef = useRef<Audio.Sound | null>(null);
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

  // 音源を読み込んでクロスフェードで再生
  const playTrack = useCallback(async (trackIndex: number) => {
    try {
      if (trackIndex < 0 || trackIndex >= musicTracks.length) {
        console.warn('Invalid track index');
        return;
      }

      // 新しいサウンドオブジェクトを作成
      const { sound: newSound } = await Audio.Sound.createAsync(
        musicTracks[trackIndex],
        { shouldPlay: true, volume: 0 }, // 初期ボリューム0でフェードイン準備
        (status) => {
          // 曲終了時の処理
          if (status.isLoaded && status.didJustFinish) {
            loadNextTrack();
          }
        }
      );

      // クロスフェード処理（2秒）
      if (soundRef.current) {
        // 既存の曲をフェードアウト
        const fadeOutSteps = 20;
        const fadeOutInterval = 2000 / fadeOutSteps;
        let currentVolume = 1;

        const fadeOutTimer = setInterval(async () => {
          currentVolume -= 1 / fadeOutSteps;
          if (currentVolume <= 0) {
            clearInterval(fadeOutTimer);
            await soundRef.current?.stopAsync();
            await soundRef.current?.unloadAsync();
            soundRef.current = newSound;
          } else {
            await soundRef.current?.setVolumeAsync(currentVolume);
          }
        }, fadeOutInterval);

        // 新しい曲をフェードイン
        let newVolume = 0;
        const fadeInTimer = setInterval(async () => {
          newVolume += 1 / fadeOutSteps;
          if (newVolume >= 1) {
            clearInterval(fadeInTimer);
            await newSound.setVolumeAsync(1);
          } else {
            await newSound.setVolumeAsync(newVolume);
          }
        }, fadeOutInterval);
      } else {
        // 初回再生時はフェードインのみ
        soundRef.current = newSound;
        const fadeInSteps = 20;
        const fadeInInterval = 2000 / fadeInSteps;
        let volume = 0;

        const fadeInTimer = setInterval(async () => {
          volume += 1 / fadeInSteps;
          if (volume >= 1) {
            clearInterval(fadeInTimer);
            await newSound.setVolumeAsync(1);
          } else {
            await newSound.setVolumeAsync(volume);
          }
        }, fadeInInterval);
      }

      setState((prev) => ({ ...prev, currentTrack: trackIndex }));
    } catch (error) {
      console.error('Error playing track:', error);
    }
  }, [musicTracks]);

  // 次の曲を読み込み
  const loadNextTrack = useCallback(async () => {
    const nextTrackIndex = getRandomTrack();
    if (nextTrackIndex !== null) {
      await playTrack(nextTrackIndex);
    }
  }, [getRandomTrack, playTrack]);

  // 再生開始
  const play = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false, // バックグラウンド実行なし
      });

      if (soundRef.current) {
        await soundRef.current.playAsync();
      } else {
        const trackIndex = getRandomTrack();
        if (trackIndex !== null) {
          await playTrack(trackIndex);
        }
      }

      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Error playing music:', error);
    }
  }, [getRandomTrack, playTrack]);

  // 一時停止
  const pause = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
      }
      setState((prev) => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Error pausing music:', error);
    }
  }, []);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (nextSoundRef.current) {
        nextSoundRef.current.unloadAsync();
      }
    };
  }, []);

  return {
    isPlaying: state.isPlaying,
    play,
    pause,
  };
};

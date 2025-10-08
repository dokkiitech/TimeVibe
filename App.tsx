import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppState, AppStateStatus } from 'react-native';
import { GradientBackground } from './components/GradientBackground';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { Clock } from './components/Clock';
import { WorkTimer } from './components/WorkTimer';
import { PlayButton } from './components/PlayButton';
import { useWorkTimer } from './hooks/useWorkTimer';
import { useMusicPlayer } from './hooks/useMusicPlayer';

export default function App() {
  const { formattedWorkTime, isRunning, start, pause, reset } = useWorkTimer();
  const { isPlaying, play, pause: pauseMusic } = useMusicPlayer();
  const appState = useRef<AppStateStatus>(AppState.currentState);

  // AppStateの変化を監視
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // アプリがバックグラウンドまたは非アクティブになった場合
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // 音楽とタイマーを一時停止
        if (isPlaying) {
          pauseMusic();
        }
        if (isRunning) {
          pause();
        }
      }

      // アプリがフォアグラウンドに戻った場合
      // ユーザーが手動で再開する必要があります

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isPlaying, isRunning, pauseMusic, pause]);

  // 再生/一時停止ボタンのハンドラー
  const handlePlayPause = async () => {
    if (isPlaying) {
      // 一時停止
      await pauseMusic();
      pause();
    } else {
      // 再生開始
      await play();
      start();
    }
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <ResponsiveLayout>
        <Clock />
        <WorkTimer formattedTime={formattedWorkTime} />
      </ResponsiveLayout>
      <PlayButton isPlaying={isPlaying} onPress={handlePlayPause} />
    </GradientBackground>
  );
}

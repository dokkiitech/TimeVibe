import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, useWindowDimensions } from 'react-native';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Text style={[
      styles.clockText,
      isLandscape ? styles.clockTextLandscape : styles.clockTextPortrait
    ]}>
      {formatTime(currentTime)}
    </Text>
  );
};

const styles = StyleSheet.create({
  clockText: {
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 4,
  },
  clockTextPortrait: {
    fontSize: 64,
  },
  clockTextLandscape: {
    fontSize: 72,
  },
});

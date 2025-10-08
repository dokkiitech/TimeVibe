import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <Text style={styles.clockText}>
      {formatTime(currentTime)}
    </Text>
  );
};

const styles = StyleSheet.create({
  clockText: {
    fontSize: 64,
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 4,
  },
});

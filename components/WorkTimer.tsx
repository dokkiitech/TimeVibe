import React from 'react';
import { Text, StyleSheet, useWindowDimensions } from 'react-native';

interface WorkTimerProps {
  formattedTime: string;
}

export const WorkTimer: React.FC<WorkTimerProps> = ({ formattedTime }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Text style={[
      styles.timerText,
      isLandscape ? styles.timerTextLandscape : styles.timerTextPortrait
    ]}>
      作業時間: {formattedTime}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: '#CCCCCC',
    fontWeight: '300',
    letterSpacing: 2,
  },
  timerTextPortrait: {
    fontSize: 28,
    marginTop: 20,
  },
  timerTextLandscape: {
    fontSize: 32,
    marginTop: 16,
  },
});

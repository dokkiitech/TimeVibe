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
      working {formattedTime}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: '#CCCCCC',
    fontFamily: 'Doto_400Regular',
    letterSpacing: 1.5,
  },
  timerTextPortrait: {
    fontSize: 28,
    marginTop: 30,
  },
  timerTextLandscape: {
    fontSize: 32,
    marginTop: 24,
  },
});

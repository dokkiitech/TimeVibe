import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

interface WorkTimerProps {
  formattedTime: string;
}

export const WorkTimer: React.FC<WorkTimerProps> = ({ formattedTime }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.labelText,
        isLandscape ? styles.labelTextLandscape : styles.labelTextPortrait
      ]}>
        working
      </Text>
      <Text style={[
        styles.timerText,
        isLandscape ? styles.timerTextLandscape : styles.timerTextPortrait
      ]}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  labelText: {
    color: '#999999',
    fontFamily: 'Doto_400Regular',
    letterSpacing: 1.5,
  },
  labelTextPortrait: {
    fontSize: 28,
    marginBottom: 8,
  },
  labelTextLandscape: {
    fontSize: 32,
    marginBottom: 10,
  },
  timerText: {
    color: '#CCCCCC',
    fontFamily: 'Doto_400Regular',
    letterSpacing: 1.5,
  },
  timerTextPortrait: {
    fontSize: 28,
  },
  timerTextLandscape: {
    fontSize: 32,
  },
});

import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface WorkTimerProps {
  formattedTime: string;
}

export const WorkTimer: React.FC<WorkTimerProps> = ({ formattedTime }) => {
  return (
    <Text style={styles.timerText}>
      作業時間: {formattedTime}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 28,
    color: '#CCCCCC',
    fontWeight: '300',
    letterSpacing: 2,
    marginTop: 20,
  },
});
